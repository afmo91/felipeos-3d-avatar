"use client";

import ChatEngine from "@/components/Signal/ChatEngine";

export default function SignalRoot() {
  return (
    <div
      id="top"
      style={{
        background:
          "radial-gradient(circle at 72% 22%, rgba(34,211,238,0.13), transparent 32%), radial-gradient(circle at 26% 72%, rgba(139,92,246,0.16), transparent 34%), linear-gradient(160deg, #080712 0%, #080810 42%, #050b10 100%)",
        // Fill the viewport below the sticky 3.5rem nav; the rest of the page scrolls beneath.
        height: "calc(100dvh - 3.5rem)",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <ChatEngine />

      <style>{`
        .signal-scene-area {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 40vh;
          overflow: hidden;
          padding-bottom: env(safe-area-inset-bottom);
          transition: left 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .signal-face {
          position: absolute;
          inset: 0;
          transition:
            inset 0.45s cubic-bezier(0.22,1,0.36,1),
            width 0.45s cubic-bezier(0.22,1,0.36,1),
            height 0.45s cubic-bezier(0.22,1,0.36,1),
            opacity 0.25s ease;
        }
        .signal-face-compact {
          inset: auto 0.75rem auto auto;
          top: 0.75rem;
          width: min(34vw, 9.5rem);
          height: min(34vw, 9.5rem);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          overflow: hidden;
          background: rgba(5,8,14,0.58);
          box-shadow: 0 18px 55px rgba(0,0,0,0.35), 0 0 36px rgba(34,211,238,0.12);
          z-index: 4;
        }
        .signal-stage-content {
          position: absolute;
          inset: 0;
          z-index: 2;
        }
        .signal-stage-content-open {
          padding-top: min(34vw, 9.5rem);
        }
        @media (min-width: 1024px) {
          .signal-scene-area {
            left: clamp(21rem, 38vw, 34rem);
            bottom: 0;
          }
          .signal-face-compact {
            inset: auto 1.25rem auto auto;
            top: 1.25rem;
            width: clamp(9rem, 16vw, 13rem);
            height: clamp(9rem, 16vw, 13rem);
          }
          .signal-stage-content-open {
            padding-top: 0;
            padding-right: clamp(10.5rem, 18vw, 15rem);
          }
        }
        @media (max-width: 420px) {
          .signal-scene-area {
            bottom: 42vh;
          }
        }
      `}</style>
    </div>
  );
}
