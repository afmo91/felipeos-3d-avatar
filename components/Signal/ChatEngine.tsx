"use client";

import dynamic from "next/dynamic";
import { useConversation } from "@/components/Signal/ConversationEngine";
import ChatPanel from "@/components/Signal/ChatPanel";
import StagePanel from "@/components/Signal/StagePanel";

const BustScene = dynamic(() => import("@/components/Signal/BustScene"), { ssr: false });

export default function ChatEngine() {
  const conversation = useConversation();
  const compact = conversation.stage.activeTopic !== "intro";

  return (
    <>
      <div className="signal-scene-area">
        <div className={compact ? "signal-face signal-face-compact" : "signal-face"}>
          <BustScene
            amplitudeRef={conversation.amplitudeRef}
            bustState={conversation.bustState}
            onAssembled={conversation.handleAssembled}
            topic={conversation.visualTopic}
          />
        </div>
        <div className={compact ? "signal-stage-content signal-stage-content-open" : "signal-stage-content"}>
          <StagePanel onAction={conversation.handleAction} stage={conversation.stage} />
        </div>
      </div>

      <ChatPanel
        audioEnabled={conversation.audioEnabled}
        isLoading={conversation.isLoading}
        messages={conversation.messages}
        onAction={conversation.handleAction}
        onReset={conversation.resetConversation}
        onSend={conversation.sendMessage}
        onToggleAudio={conversation.toggleAudio}
        suggestions={conversation.suggestions}
      />
    </>
  );
}
