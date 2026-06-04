"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  INITIAL_ASSISTANT_TEXT,
  INITIAL_CHIPS,
  SCRIPTED_AUDIO_FILES,
  STORAGE_KEY,
  actionsForTopic,
  defaultStage,
  detectTopic,
  inferPlanCategory,
  initialRoute,
  isAudioOptIn,
  isAudioOptOut,
  localFallbackReply,
  visualTopicForStage,
  wantsSolutionBuilder,
  type ChatAction,
  type Message,
  type PersistedConversation,
  type StageState,
  type VisualTopic,
} from "@/lib/conversation";
import {
  audienceOptions,
  buildSolutionPlan,
  planCategories,
  timelineOptions,
  toolOptions,
  type BuilderDraft,
  type PlanCategory,
} from "@/data/solutionPlans";
import { getBookingHref, hasBookingUrl } from "@/lib/booking";
import type { BustState } from "./BustScene";

const AUDIO_STORAGE_KEY = "felipe-os-audio-enabled-v1";

let msgCounter = 0;
function uid() {
  msgCounter += 1;
  return `msg-${Date.now()}-${msgCounter}`;
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

type Playback = {
  done: Promise<void>;
};

function estimateDuration(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(650, (words / 3.4) * 1000);
}

function normalize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s/+-]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function findOption<T extends string>(input: string, options: readonly T[]) {
  const normalized = normalize(input);
  return options.find((option) => normalize(option) === normalized);
}

function parseTools(input: string) {
  const selected = findOption(input, toolOptions);
  if (selected && selected !== "Other") return [selected];
  if (selected === "Other") return ["Other"];

  return input
    .split(/,|\+|\/|\band\b/gi)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function extractContactDetails(input: string) {
  const email = input.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0]?.toLowerCase();
  const website = input.match(/https?:\/\/[^\s]+|(?:www\.)[^\s]+/i)?.[0];
  const withoutEmail = email ? input.replace(email, "").trim() : input.trim();
  const withoutWebsite = website ? withoutEmail.replace(website, "").trim() : withoutEmail;
  const parts = withoutWebsite
    .split(/,|\||-/)
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    email,
    name: parts[0],
    company: parts[1],
    website,
  };
}

function summarizeChat(messages: Message[]) {
  return messages
    .slice(-8)
    .map((message) => `${message.role === "user" ? "User" : "Felipe"}: ${message.text}`)
    .join("\n")
    .slice(0, 1100);
}

function cloneDefaultStage(): StageState {
  return {
    ...defaultStage,
    builderDraft: {},
  };
}

function stagePatchFromTopic(topic: VisualTopic): Partial<StageState> | undefined {
  if (topic === "results") {
    return {
      activeTopic: "proof",
      selectedProofCase: "paid-media-operating-layer",
    };
  }

  if (topic === "experience") {
    return { activeTopic: "recruiting" };
  }

  if (topic === "contact") {
    return { activeTopic: "contact" };
  }

  if (topic === "growth") {
    return {
      activeTopic: "services",
      selectedService: "growth-system-audit",
    };
  }

  if (topic === "product") {
    return {
      activeTopic: "services",
      selectedService: "product-mvp-build",
    };
  }

  if (topic === "ai") {
    return {
      activeTopic: "services",
      selectedService: "ai-workflow-sprint",
    };
  }

  return undefined;
}

type FelipeOSEventName =
  | "chat_chip_clicked"
  | "plan_started"
  | "lead_submitted"
  | "booking_clicked"
  | "cv_downloaded";

function emitFelipeOSEvent(name: FelipeOSEventName, detail: Record<string, unknown> = {}) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
  window.dispatchEvent(new CustomEvent("felipe-os:event", { detail: { name, ...detail } }));
}

function readPersisted(): PersistedConversation | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedConversation;
    if (!Array.isArray(parsed.messages) || !parsed.stage) return null;
    return parsed;
  } catch {
    return null;
  }
}

function useVoice() {
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const amplitudeRef = useRef(0);
  const rafRef = useRef(0);

  const ensureContext = useCallback(() => {
    if (!ctxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) {
        throw new Error("AudioContext is not available.");
      }
      const context = new Ctx();
      const analyser = context.createAnalyser();
      analyser.fftSize = 64;
      analyser.connect(context.destination);
      ctxRef.current = context;
      analyserRef.current = analyser;
    }

    return ctxRef.current;
  }, []);

  const stopAudio = useCallback(() => {
    try {
      sourceRef.current?.stop();
    } catch {
      // Already stopped.
    }
    sourceRef.current = null;
    cancelAnimationFrame(rafRef.current);
    amplitudeRef.current = 0;
  }, []);

  const unlockAudio = useCallback(() => {
    try {
      const context = ensureContext();
      if (context.state === "suspended") {
        void context.resume();
      }
    } catch {
      // Browser denied audio until a later gesture.
    }
  }, [ensureContext]);

  const playBuffer = useCallback(
    async (buffer: ArrayBuffer): Promise<Playback | null> => {
      let context: AudioContext;
      try {
        context = ensureContext();
        if (context.state === "suspended") {
          await context.resume();
        }
      } catch {
        return null;
      }

      stopAudio();

      try {
        const audioBuffer = await context.decodeAudioData(buffer.slice(0));
        const source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(analyserRef.current!);
        sourceRef.current = source;

        const data = new Uint8Array(analyserRef.current!.frequencyBinCount);
        const poll = () => {
          if (!sourceRef.current) {
            amplitudeRef.current = 0;
            return;
          }
          analyserRef.current?.getByteFrequencyData(data);
          amplitudeRef.current =
            Array.from(data)
              .slice(0, 12)
              .reduce((sum, value) => sum + value, 0) /
            12 /
            255;
          rafRef.current = requestAnimationFrame(poll);
        };

        const done = new Promise<void>((resolve) => {
          source.onended = () => {
            if (sourceRef.current === source) {
              sourceRef.current = null;
            }
            amplitudeRef.current = 0;
            resolve();
          };
        });

        source.start();
        poll();
        return { done };
      } catch {
        amplitudeRef.current = 0;
        return null;
      }
    },
    [ensureContext, stopAudio],
  );

  const playUrl = useCallback(
    async (src: string) => {
      try {
        const response = await fetch(src);
        if (!response.ok) return null;
        return playBuffer(await response.arrayBuffer());
      } catch {
        return null;
      }
    },
    [playBuffer],
  );

  const playTts = useCallback(
    async (text: string) => {
      try {
        const response = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        if (!response.ok) return null;
        return playBuffer(await response.arrayBuffer());
      } catch {
        return null;
      }
    },
    [playBuffer],
  );

  useEffect(() => stopAudio, [stopAudio]);

  return { amplitudeRef, playTts, playUrl, stopAudio, unlockAudio };
}

export type ConvHook = {
  messages: Message[];
  suggestions: string[];
  bustState: BustState;
  visualTopic: VisualTopic;
  stage: StageState;
  isLoading: boolean;
  audioEnabled: boolean;
  amplitudeRef: React.RefObject<number>;
  handleAction: (action: ChatAction) => void;
  handleAssembled: () => void;
  resetConversation: () => void;
  sendMessage: (text: string) => void;
  toggleAudio: () => void;
};

export function useConversation(): ConvHook {
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [stage, setStage] = useState<StageState>(() => cloneDefaultStage());
  const [visualTopic, setVisualTopic] = useState<VisualTopic>("neutral");
  const [bustState, setBustState] = useState<BustState>("assembling");
  const [isLoading, setLoading] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [assembled, setAssembled] = useState(false);

  const audioEnabledRef = useRef(false);
  const busyRef = useRef(false);
  const startedRef = useRef(false);
  const messagesRef = useRef<Message[]>([]);
  const stageRef = useRef<StageState>(cloneDefaultStage());
  const historyRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);

  const { amplitudeRef, playTts, playUrl, stopAudio, unlockAudio } = useVoice();

  useEffect(() => {
    audioEnabledRef.current = audioEnabled;
  }, [audioEnabled]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    SCRIPTED_AUDIO_FILES.forEach((src) => {
      const clip = new Audio(src);
      clip.preload = "auto";
    });
  }, []);

  useEffect(() => {
    const saved = readPersisted();
    if (saved) {
      setMessages(saved.messages);
      setSuggestions(saved.suggestions ?? []);
      setStage({
        ...cloneDefaultStage(),
        ...saved.stage,
        builderDraft: saved.stage.builderDraft ?? {},
      });
      setVisualTopic(saved.visualTopic ?? visualTopicForStage(saved.stage.activeTopic));
      historyRef.current = saved.messages
        .filter((message) => message.text)
        .map((message) => ({
          role: message.role === "user" ? "user" : "assistant",
          content: message.text,
      }));
      startedRef.current = saved.messages.length > 0;
    }

    try {
      const savedAudio = window.localStorage.getItem(AUDIO_STORAGE_KEY);
      if (savedAudio === "true") {
        audioEnabledRef.current = true;
        setAudioEnabled(true);
        unlockAudio();
      }
    } catch {
      // localStorage may be blocked.
    }
    setHydrated(true);
  }, [unlockAudio]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        messages,
        suggestions,
        stage,
        visualTopic,
      } satisfies PersistedConversation),
    );
  }, [hydrated, messages, stage, suggestions, visualTopic]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(AUDIO_STORAGE_KEY, String(audioEnabled));
    } catch {
      // localStorage may be blocked.
    }
  }, [audioEnabled, hydrated]);

  const setAudio = useCallback(
    (enabled: boolean) => {
      audioEnabledRef.current = enabled;
      setAudioEnabled(enabled);
      if (enabled) {
        unlockAudio();
      } else {
        stopAudio();
      }
    },
    [stopAudio, unlockAudio],
  );

  const typewrite = useCallback(async (msgId: string, text: string) => {
    const shouldRevealImmediately =
      document.visibilityState !== "visible" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (shouldRevealImmediately) {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === msgId ? { ...msg, text } : msg)),
      );
      return;
    }

    const total = text.length;
    const steps = Math.max(1, Math.min(10, Math.ceil(total / 16)));
    const interval = Math.max(24, Math.min(90, estimateDuration(text) / steps));

    for (let step = 1; step <= steps; step += 1) {
      const index = Math.ceil((total * step) / steps);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === msgId ? { ...msg, text: text.slice(0, index) } : msg)),
      );
      await sleep(interval);
    }
  }, []);

  const deliverFelipe = useCallback(
    async (
      payload: {
        text: string;
        topic: VisualTopic;
        suggestedReplies?: string[];
        actionButtons?: ChatAction[];
        voiceFile?: string;
      },
      options: { dynamicTts?: boolean; forceSilent?: boolean } = {},
    ) => {
      const msgId = uid();
      const message: Message = {
        actionButtons: [],
        id: msgId,
        role: "felipe",
        suggestedReplies: [],
        text: "",
        topic: payload.topic,
      };

      setVisualTopic(payload.topic);
      setBustState("speaking");
      setSuggestions([]);
      setMessages((prev) => [...prev, message]);

      const shouldPlay = audioEnabledRef.current && !options.forceSilent;
      const playbackPromise = (async (): Promise<void> => {
        if (!shouldPlay) return;

        let playback: Playback | null = null;
        if (payload.voiceFile) {
          playback = await playUrl(payload.voiceFile);
        } else if (options.dynamicTts) {
          playback = await playTts(payload.text);
        }

        await playback?.done;
      })();

      await Promise.all([typewrite(msgId, payload.text), playbackPromise]);

      const replies = payload.suggestedReplies ?? [];
      const actionButtons = payload.actionButtons ?? [];
      setMessages((prev) =>
        prev.map((msg) => (msg.id === msgId ? { ...msg, actionButtons, suggestedReplies: replies } : msg)),
      );
      setSuggestions(replies);
      historyRef.current.push({ role: "assistant", content: payload.text });
      setBustState("listening");
    },
    [playTts, playUrl, typewrite],
  );

  const deliverInitial = useCallback(async () => {
    if (startedRef.current) return;
    startedRef.current = true;
    await deliverFelipe(
      {
        text: INITIAL_ASSISTANT_TEXT,
        topic: "neutral",
        suggestedReplies: INITIAL_CHIPS,
      },
      { forceSilent: true },
    );
  }, [deliverFelipe]);

  useEffect(() => {
    if (!hydrated || startedRef.current || messagesRef.current.length > 0) return;

    const timer = window.setTimeout(
      () => {
        if (startedRef.current || messagesRef.current.length > 0) return;
        void deliverInitial();
      },
      assembled ? 300 : 900,
    );

    return () => window.clearTimeout(timer);
  }, [assembled, deliverInitial, hydrated]);

  const handleAssembled = useCallback(() => {
    setAssembled(true);
    setBustState("idle");
  }, []);

  const toggleAudio = useCallback(() => {
    setAudio(!audioEnabledRef.current);
  }, [setAudio]);

  const updateStage = useCallback((patch: Partial<StageState>) => {
    setStage((current) => {
      const next = {
        ...current,
        ...patch,
        builderDraft: patch.builderDraft ?? current.builderDraft,
      };
      setVisualTopic(visualTopicForStage(next.activeTopic));
      return next;
    });
  }, []);

  const askBuilderUseCase = useCallback(
    async (draft: BuilderDraft = {}) => {
      updateStage({
        activeTopic: "solutionBuilder",
        builderDraft: draft,
        builderStep: "useCase",
        generatedPlan: undefined,
        guidedMode: true,
      });
      setLoading(false);
      await deliverFelipe(
        {
          text: "Let's build a useful first plan. What do you want to improve or automate?",
          topic: "ai",
          suggestedReplies: planCategories,
        },
        { dynamicTts: true },
      );
    },
    [deliverFelipe, updateStage],
  );

  const askBuilderTools = useCallback(
    async (draft: BuilderDraft) => {
      updateStage({
        activeTopic: "solutionBuilder",
        builderDraft: draft,
        builderStep: "tools",
        guidedMode: true,
      });
      setLoading(false);
      await deliverFelipe(
        {
          text: "Good. What tools do you use today?",
          topic: "ai",
          suggestedReplies: toolOptions,
        },
        { dynamicTts: true },
      );
    },
    [deliverFelipe, updateStage],
  );

  const askBuilderAudience = useCallback(
    async (draft: BuilderDraft) => {
      updateStage({
        activeTopic: "solutionBuilder",
        builderDraft: draft,
        builderStep: "audience",
        guidedMode: true,
      });
      setLoading(false);
      await deliverFelipe(
        {
          text: "Who is this workflow for?",
          topic: "product",
          suggestedReplies: audienceOptions,
        },
        { dynamicTts: true },
      );
    },
    [deliverFelipe, updateStage],
  );

  const askBuilderTimeline = useCallback(
    async (draft: BuilderDraft) => {
      updateStage({
        activeTopic: "solutionBuilder",
        builderDraft: draft,
        builderStep: "timeline",
        guidedMode: true,
      });
      setLoading(false);
      await deliverFelipe(
        {
          text: "What timeline are you considering?",
          topic: "product",
          suggestedReplies: timelineOptions,
        },
        { dynamicTts: true },
      );
    },
    [deliverFelipe, updateStage],
  );

  const finishBuilderPreview = useCallback(
    async (draft: BuilderDraft) => {
      const generatedPlan = buildSolutionPlan(draft);
      updateStage({
        activeTopic: "solutionBuilder",
        builderDraft: draft,
        builderStep: "idle",
        generatedPlan,
        guidedMode: true,
      });
      setLoading(false);
      await deliverFelipe(
        {
          text:
            "I drafted a local preview plan. It is enough to discuss scope before saving anything or booking a first sprint.",
          topic: "ai",
          actionButtons: [
            { type: "save_plan", label: "Save this plan" },
            { type: "book", label: "Book a 30-min call" },
            { type: "adjust_plan", label: "Adjust plan" },
          ],
        },
        { dynamicTts: true },
      );
    },
    [deliverFelipe, updateStage],
  );

  const handleBuilderAnswer = useCallback(
    async (input: string) => {
      const current = stageRef.current;
      const draft = current.builderDraft;

      if (current.builderStep === "useCase") {
        const useCase = findOption(input, planCategories) ?? inferPlanCategory(input) ?? "Other";
        await askBuilderTools({ ...draft, useCase });
        return;
      }

      if (current.builderStep === "tools") {
        await askBuilderAudience({ ...draft, tools: parseTools(input) });
        return;
      }

      if (current.builderStep === "audience") {
        await askBuilderTimeline({ ...draft, audience: findOption(input, audienceOptions) ?? input.slice(0, 80) });
        return;
      }

      if (current.builderStep === "timeline") {
        await finishBuilderPreview({ ...draft, timeline: findOption(input, timelineOptions) ?? input.slice(0, 80) });
      }
    },
    [askBuilderAudience, askBuilderTimeline, askBuilderTools, finishBuilderPreview],
  );

  const saveLeadFromEmail = useCallback(
    async (input: string) => {
      const details = extractContactDetails(input);

      if (!details.email) {
        setLoading(false);
        await deliverFelipe(
          {
            text: "I need an email to save and follow up on the plan. You can also book directly if that is easier.",
            topic: "contact",
            actionButtons: [
              { type: "book", label: "Book a 30-min call" },
              { type: "email", label: "Email Felipe" },
            ],
          },
          { dynamicTts: true },
        );
        updateStage({ builderStep: "email" });
        return;
      }

      const current = stageRef.current;
      const draft = {
        ...current.builderDraft,
        company: details.company,
        email: details.email,
        name: details.name,
        website: details.website,
      };
      updateStage({ builderDraft: draft, builderStep: "idle", guidedMode: true });

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatSummary: summarizeChat(messagesRef.current),
          company: draft.company,
          email: draft.email,
          generatedPlan: current.generatedPlan,
          name: draft.name,
          problemSummary: draft.useCase,
          serviceInterest: draft.serviceInterest,
          timeline: draft.timeline,
          tools: draft.tools,
          useCase: draft.useCase,
          website: draft.website,
        }),
      }).catch(() => null);

      setLoading(false);

      if (!response?.ok) {
        await deliverFelipe(
          {
            text:
              response?.status === 503
                ? "I kept the preview local. The best next step is a 30-minute call to scope the workflow and tools."
                : "The save did not go through, but the plan preview is still here. The best next step is a 30-minute call.",
            topic: "contact",
            actionButtons: [
              { type: "book", label: "Book a 30-min call" },
              { type: "email", label: "Email Felipe" },
            ],
          },
          { dynamicTts: true },
        );
        return;
      }

      emitFelipeOSEvent("lead_submitted", {
        serviceInterest: draft.serviceInterest,
        useCase: draft.useCase,
      });

      await deliverFelipe(
        {
          text: "Saved. The best next step is a 30-minute call to confirm workflow, tools and first sprint scope.",
          topic: "contact",
          actionButtons: [
            { type: "book", label: "Open calendar" },
            { type: "email", label: "Email Felipe" },
          ],
        },
        { dynamicTts: true },
      );
    },
    [deliverFelipe, updateStage],
  );

  const sendMessage = useCallback(
    (text: string) => {
      const input = text.trim();
      if (!input || busyRef.current || !hydrated) return;

      busyRef.current = true;

      if (isAudioOptIn(input)) {
        setAudio(true);
      } else if (isAudioOptOut(input)) {
        setAudio(false);
      } else if (audioEnabledRef.current) {
        unlockAudio();
      }

      if (INITIAL_CHIPS.includes(input)) {
        emitFelipeOSEvent("chat_chip_clicked", { label: input });
      }

      const userMsg: Message = { id: uid(), role: "user", text: input };
      setMessages((prev) => [...prev, userMsg]);
      historyRef.current.push({ role: "user", content: input });
      setSuggestions([]);
      setLoading(true);
      setBustState("thinking");

      void (async () => {
        try {
          await sleep(280);

          const current = stageRef.current;
          if (current.builderStep === "email") {
            await saveLeadFromEmail(input);
            return;
          }

          if (current.builderStep !== "idle") {
            await handleBuilderAnswer(input);
            return;
          }

          const routed = initialRoute(input);
          if (routed) {
            setLoading(false);
            await deliverFelipe(
              {
                actionButtons: routed.actions,
                text: routed.text,
                topic: routed.topic,
              },
              { dynamicTts: true },
            );
            if (routed.stagePatch) updateStage(routed.stagePatch);
            return;
          }

          if (wantsSolutionBuilder(input)) {
            await askBuilderUseCase({
              useCase: inferPlanCategory(input),
            });
            return;
          }

          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input, history: historyRef.current.slice(-6) }),
          }).catch(() => null);
          const data = (await response?.json().catch(() => null)) as
            | { reply?: string; topic?: VisualTopic }
            | null;
          const fallback = localFallbackReply(input);
          const reply = data?.reply ?? fallback.reply;
          const topic = data?.topic ?? fallback.topic ?? detectTopic(input);
          setLoading(false);
          await deliverFelipe(
            {
              actionButtons: actionsForTopic(topic).slice(0, 3),
              text: reply,
              topic,
            },
            { dynamicTts: true },
          );
          const stagePatch = stagePatchFromTopic(topic);
          if (stagePatch) updateStage(stagePatch);
        } finally {
          setLoading(false);
          busyRef.current = false;
        }
      })();
    },
    [askBuilderUseCase, deliverFelipe, handleBuilderAnswer, hydrated, saveLeadFromEmail, setAudio, unlockAudio, updateStage],
  );

  const handleAction = useCallback(
    (action: ChatAction) => {
      if (action.type === "stage") {
        updateStage({
          activeTopic: action.topic,
          selectedProofCase: action.selectedProofCase ?? stageRef.current.selectedProofCase,
          selectedService: action.selectedService ?? stageRef.current.selectedService,
        });
        return;
      }

      if (action.type === "start_builder") {
        emitFelipeOSEvent("plan_started", {
          selectedService: action.selectedService,
          seedUseCase: action.seedUseCase,
        });
        void askBuilderUseCase({
          serviceInterest: action.selectedService,
          useCase: action.seedUseCase,
        } as BuilderDraft);
        return;
      }

      if (action.type === "save_plan") {
        updateStage({ activeTopic: "solutionBuilder", builderStep: "email", guidedMode: true });
        void deliverFelipe(
          {
            text: "Where should I send the plan or follow-up? Share your email, and optionally your name, company or website.",
            topic: "contact",
          },
          { dynamicTts: true },
        );
        return;
      }

      if (action.type === "adjust_plan") {
        emitFelipeOSEvent("plan_started", { source: "adjust_plan" });
        void askBuilderUseCase(stageRef.current.builderDraft);
        return;
      }

      if (action.type === "book") {
        emitFelipeOSEvent("booking_clicked", { label: action.label });
        updateStage({ activeTopic: "contact" });
        const href = getBookingHref();
        if (hasBookingUrl()) {
          window.open(href, "_blank", "noopener,noreferrer");
        } else {
          window.location.href = href;
        }
        return;
      }

      if (action.type === "email") {
        updateStage({ activeTopic: "contact" });
        window.location.href = "mailto:felipe.mejia@spotz.pro?subject=Felipe%20OS%20project";
        return;
      }

      if (action.type === "download_cv") {
        emitFelipeOSEvent("cv_downloaded", { source: "chat" });
        updateStage({ activeTopic: "cv" });
        window.open("/api/download/cv", "_blank", "noopener,noreferrer");
      }
    },
    [askBuilderUseCase, deliverFelipe, updateStage],
  );

  const resetConversation = useCallback(() => {
    stopAudio();
    busyRef.current = false;
    historyRef.current = [];
    const nextStage = cloneDefaultStage();
    const initialMessage: Message = {
      id: uid(),
      role: "felipe",
      text: INITIAL_ASSISTANT_TEXT,
      topic: "neutral",
      suggestedReplies: INITIAL_CHIPS,
    };
    setMessages([initialMessage]);
    setSuggestions(INITIAL_CHIPS);
    setStage(nextStage);
    setVisualTopic("neutral");
    setBustState("listening");
    startedRef.current = true;
    window.localStorage.removeItem(STORAGE_KEY);
  }, [stopAudio]);

  return {
    messages,
    suggestions,
    bustState,
    visualTopic,
    stage,
    isLoading,
    audioEnabled,
    amplitudeRef,
    handleAction,
    handleAssembled,
    resetConversation,
    sendMessage,
    toggleAudio,
  };
}
