import type { CaseStudyId } from "@/data/caseStudies";
import type { ServiceId } from "@/data/services";
import type { BuilderDraft, PlanCategory, SolutionPlan } from "@/data/solutionPlans";

export type VisualTopic =
  | "neutral"
  | "results"
  | "ai"
  | "growth"
  | "product"
  | "experience"
  | "contact";

export type ActiveTopic =
  | "intro"
  | "services"
  | "proof"
  | "recruiting"
  | "cv"
  | "contact"
  | "solutionBuilder";

export type BuilderStep = "idle" | "useCase" | "tools" | "audience" | "timeline" | "email";

export type ChatAction =
  | {
      type: "stage";
      label: string;
      topic: ActiveTopic;
      selectedService?: ServiceId;
      selectedProofCase?: CaseStudyId;
    }
  | { type: "start_builder"; label: string; seedUseCase?: PlanCategory; selectedService?: ServiceId }
  | { type: "save_plan"; label: string }
  | { type: "adjust_plan"; label: string }
  | { type: "book"; label: string }
  | { type: "email"; label: string }
  | { type: "download_cv"; label: string };

export type Message = {
  id: string;
  role: "felipe" | "user";
  text: string;
  topic?: VisualTopic;
  suggestedReplies?: string[];
  actionButtons?: ChatAction[];
};

export type StageState = {
  activeTopic: ActiveTopic;
  selectedService?: ServiceId;
  selectedProofCase?: CaseStudyId;
  generatedPlan?: SolutionPlan;
  builderDraft: BuilderDraft;
  builderStep: BuilderStep;
  guidedMode: boolean;
};

export type PersistedConversation = {
  messages: Message[];
  suggestions: string[];
  stage: StageState;
  visualTopic: VisualTopic;
};

export type RouteResponse = {
  actions: ChatAction[];
  stagePatch?: Partial<StageState>;
  text: string;
  topic: VisualTopic;
};

export const STORAGE_KEY = "felipe-os-chat-state-v1";

export const INITIAL_ASSISTANT_TEXT =
  "Hi, I'm Felipe. I build AI-powered systems for product, growth and operations. What would you like to explore?";

export const INITIAL_CHIPS = [
  "I need an AI system",
  "Show proof of work",
  "I'm recruiting",
  "Book a call",
  "What can you build?",
];

export const defaultStage: StageState = {
  activeTopic: "intro",
  builderDraft: {},
  builderStep: "idle",
  guidedMode: false,
  selectedProofCase: "paid-media-operating-layer",
  selectedService: "ai-workflow-sprint",
};

export const SCRIPTED_AUDIO_FILES: string[] = [];

function norm(input: string) {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s/+-]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function exact(input: string, values: string[]) {
  const normalized = norm(input);
  return values.some((value) => norm(value) === normalized);
}

export function isAudioOptIn(input: string) {
  return exact(input, ["audio on", "unmute", "speak"]);
}

export function isAudioOptOut(input: string) {
  return exact(input, ["audio off", "mute", "stop audio"]);
}

export function detectTopic(text: string): VisualTopic {
  const t = text.toLowerCase();
  if (t.match(/proof|result|metric|conver|cac|roas|revenue|\+\d+%|recover|activation|budget|€|eur/)) return "results";
  if (t.match(/ai|agent|llm|assistant|model|workflow|automat|copilot|sav|support/)) return "ai";
  if (t.match(/growth|funnel|channel|paid|performance|cpc|cpa|experiment|ads|attribution/)) return "growth";
  if (t.match(/product|sprint|roadmap|0.*1|build|ship|launch|mvp|dashboard|api/)) return "product";
  if (t.match(/recruit|cv|resume|experience|company|spotz|adamo|segmentta|career|role|job/)) return "experience";
  if (t.match(/contact|reach|hire|call|calendar|linkedin|github|email/)) return "contact";
  return "neutral";
}

export function visualTopicForStage(topic: ActiveTopic): VisualTopic {
  if (topic === "proof") return "results";
  if (topic === "services" || topic === "solutionBuilder") return "ai";
  if (topic === "recruiting" || topic === "cv") return "experience";
  if (topic === "contact") return "contact";
  return "neutral";
}

const actionSets = {
  aiSystem: [
    { type: "start_builder", label: "Build my plan" },
    {
      type: "stage",
      label: "See AI Workflow Sprint",
      topic: "services",
      selectedService: "ai-workflow-sprint",
    },
    { type: "book", label: "Book a 30-min call" },
  ] satisfies ChatAction[],
  proof: [
    {
      type: "stage",
      label: "Open proof panel",
      topic: "proof",
      selectedProofCase: "paid-media-operating-layer",
    },
    {
      type: "stage",
      label: "Show growth results",
      topic: "proof",
      selectedProofCase: "growth-audit-experimentation-system",
    },
    { type: "book", label: "Book a call" },
  ] satisfies ChatAction[],
  recruiting: [
    { type: "stage", label: "Open CV", topic: "cv" },
    { type: "stage", label: "Show experience", topic: "recruiting" },
    { type: "download_cv", label: "Download CV" },
  ] satisfies ChatAction[],
  booking: [
    { type: "book", label: "Open calendar" },
    { type: "email", label: "Email Felipe" },
  ] satisfies ChatAction[],
  build: [
    { type: "stage", label: "Show services", topic: "services" },
    {
      type: "stage",
      label: "Show systems",
      topic: "proof",
      selectedProofCase: "ai-support-assistant",
    },
    { type: "start_builder", label: "Build my plan" },
  ] satisfies ChatAction[],
  freeform: [
    { type: "stage", label: "Show services", topic: "services" },
    { type: "start_builder", label: "Build my plan" },
    { type: "book", label: "Book a call" },
  ] satisfies ChatAction[],
};

export function initialRoute(input: string): RouteResponse | null {
  if (exact(input, ["I need an AI system"])) {
    return {
      text:
        "Good starting point. I usually begin by mapping the workflow, identifying where an agent can act, and shipping a small prototype in 1–2 weeks.",
      topic: "ai" as VisualTopic,
      actions: actionSets.aiSystem,
      stagePatch: {
        activeTopic: "services",
        selectedService: "ai-workflow-sprint",
      },
    };
  }

  if (exact(input, ["Show proof of work"])) {
    return {
      text:
        "I can show representative systems around paid media, CRM automation, support assistants, document workflows and growth audits.",
      topic: "results" as VisualTopic,
      actions: actionSets.proof,
      stagePatch: {
        activeTopic: "proof",
        selectedProofCase: "paid-media-operating-layer",
      },
    };
  }

  if (exact(input, ["I'm recruiting"])) {
    return {
      text:
        "My profile combines product, growth and AI systems: 0→1 product building, analytics, paid acquisition, dashboards and cross-functional execution.",
      topic: "experience" as VisualTopic,
      actions: actionSets.recruiting,
      stagePatch: {
        activeTopic: "recruiting",
      },
    };
  }

  if (exact(input, ["Book a call"])) {
    return {
      text:
        "Perfect. Pick a 30-minute slot and I'll use it to understand your workflow, growth problem or product opportunity.",
      topic: "contact" as VisualTopic,
      actions: actionSets.booking,
      stagePatch: {
        activeTopic: "contact",
      },
    };
  }

  if (exact(input, ["What can you build?"])) {
    return {
      text:
        "I build AI assistants, agentic workflows, automation layers, dashboards, growth systems and MVPs that connect real business operations.",
      topic: "product" as VisualTopic,
      actions: actionSets.build,
      stagePatch: {
        activeTopic: "services",
      },
    };
  }

  return null;
}

export function wantsSolutionBuilder(input: string) {
  const t = norm(input);
  return Boolean(
    t.match(
      /build my plan|agent|assistant|automation|automate|workflow|growth audit|cac|mvp|dashboard|support|sav|prospecting|lead gen|crm|document|internal tool|api|integration/,
    ),
  );
}

export function inferPlanCategory(input: string): PlanCategory | undefined {
  const t = norm(input);
  if (t.match(/prospect|lead gen|outreach|sales|b2b/)) return "B2B prospecting";
  if (t.match(/support|sav|ticket|customer question|helpdesk/)) return "Customer support / SAV";
  if (t.match(/admin|document|paper|pdf|form|checklist/)) return "Admin/document workflow";
  if (t.match(/paid|cac|roas|ads|attribution|growth|campaign/)) return "Paid growth / CAC";
  if (t.match(/dashboard|report|internal|ops|metric/)) return "Internal dashboard";
  if (t.match(/mvp|product|app|web app|tool/)) return "Product/MVP";
  return undefined;
}

export function actionsForTopic(topic: VisualTopic): ChatAction[] {
  if (topic === "results") return actionSets.proof;
  if (topic === "experience") return actionSets.recruiting;
  if (topic === "contact") return actionSets.booking;
  if (topic === "growth") {
    return [
      {
        type: "stage",
        label: "Open growth proof",
        topic: "proof",
        selectedProofCase: "growth-audit-experimentation-system",
      },
      {
        type: "stage",
        label: "See Growth System Audit",
        topic: "services",
        selectedService: "growth-system-audit",
      },
      { type: "book", label: "Book a call" },
    ];
  }
  return actionSets.freeform;
}

export function localFallbackReply(message: string) {
  const topic = detectTopic(message);
  const t = message.toLowerCase();

  if (t.includes("github")) {
    return {
      reply: "My GitHub is https://github.com/afmo91. The useful commercial scan is services, proof of work, or CV.",
      topic: "contact" as VisualTopic,
    };
  }
  if (t.includes("linkedin")) {
    return {
      reply: "My LinkedIn is https://www.linkedin.com/in/felipemejiaosorio/. For a project, the fastest next step is a 30-minute call.",
      topic: "contact" as VisualTopic,
    };
  }
  if (t.includes("cv") || t.includes("resume") || t.includes("recruit")) {
    return {
      reply: "The public CV is built for recruiters: product, growth, AI systems, metrics and downloadable PDF.",
      topic: "experience" as VisualTopic,
    };
  }
  if (topic === "results") {
    return {
      reply: "The strongest proof is representative systems: paid media ops, CRM automation, support assistants, document workflows and growth audits.",
      topic,
    };
  }
  if (topic === "ai") {
    return {
      reply: "Useful AI work starts with the workflow: intake, context, decision, action and feedback. I can turn your use case into a first sprint plan.",
      topic,
    };
  }
  if (topic === "growth") {
    return {
      reply: "Growth work usually starts by finding tracking gaps, wasted spend and the next measurable experiment. I can map the audit scope quickly.",
      topic,
    };
  }

  return {
    reply:
      "I can help if the problem touches AI systems, automation, dashboards, APIs, paid growth or MVP builds. The next useful move is to map the workflow.",
    topic,
  };
}

export const FELIPE_SYSTEM_PROMPT = `You are Felipe Mejia speaking inside Felipe OS, a chat-first commercial portfolio.

Rules:
- Respond in 1-2 short sentences, maximum 35 words total
- Be commercial, human and specific
- Focus on AI systems, agentic workflows, AI assistants, automation, systems integrations, APIs, growth, paid ads, dashboards, product/MVP builds and consulting
- Do not write long generic AI explanations
- Do not invent private client data
- Return only JSON with this shape:
{ "reply": "...", "topic": "neutral|results|ai|growth|product|experience|contact" }

Context:
- Felipe builds AI-powered systems for product, growth and operations
- Services: AI Workflow Sprint, AI Assistant Build, Growth System Audit, Product / MVP Build
- Proof themes: AI paid media operating layer, B2B lead generation and CRM automation, AI support assistant, AI admin/document assistant, product website/CMS/conversion systems, growth audit and experimentation systems
- Experience: Spotz.pro AI paid media SaaS; Adamo Telecom growth product and digital acquisition; Segmentta B2B consulting
- Results include +25% conversion, -30% CAC, same-day activation, €200K+ recovered waste and €3M+ annual media budget
- Contact: felipe.mejia@spotz.pro, LinkedIn https://www.linkedin.com/in/felipemejiaosorio/, GitHub https://github.com/afmo91`;
