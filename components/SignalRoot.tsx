"use client";

import ChatEngine from "@/components/Signal/ChatEngine";
import { getBookingHref, getBookingTarget, hasBookingUrl } from "@/lib/booking";

function TopBar() {
  const bookingHref = getBookingHref();
  const bookingTarget = getBookingTarget();

  return (
    <div
      style={{
        alignItems: "center",
        backdropFilter: "blur(16px)",
        background: "rgba(8,8,16,0.7)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        height: "3.5rem",
        justifyContent: "space-between",
        left: 0,
        padding: "0 1.25rem",
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: 80,
      }}
    >
      <span style={{ color: "#fff", fontSize: "1rem", fontWeight: 800, letterSpacing: 0 }}>
        Felipe OS
      </span>
      <a
        href={bookingHref}
        rel={hasBookingUrl() ? "noopener noreferrer" : undefined}
        style={{
          background: "rgba(34,211,238,0.1)",
          border: "1px solid rgba(34,211,238,0.28)",
          borderRadius: "999px",
          color: "#f8fdff",
          fontSize: "0.8125rem",
          fontWeight: 700,
          padding: "0.55rem 0.9rem",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
        target={bookingTarget}
      >
        Book a 30-min call
      </a>
    </div>
  );
}

export default function SignalRoot() {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle at 72% 22%, rgba(34,211,238,0.13), transparent 32%), radial-gradient(circle at 26% 72%, rgba(139,92,246,0.16), transparent 34%), linear-gradient(160deg, #080712 0%, #080810 42%, #050b10 100%)",
        inset: 0,
        overflow: "hidden",
        position: "fixed",
        zIndex: 100,
      }}
    >
      <TopBar />
      <ChatEngine />

      <style>{`
        .signal-scene-area {
          position: absolute;
          top: 3.5rem;
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
