"use client";
import { useEffect, useState } from "react";

export default function TrendlyLoader({ onFinish }) {
  const [phase, setPhase] = useState("enter"); // enter → idle → exit

  useEffect(() => {
    // after 2.8s start exit animation, then call onFinish
    const exitTimer = setTimeout(() => setPhase("exit"), 2800);
    const doneTimer = setTimeout(() => onFinish?.(), 3400);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a14",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        opacity: phase === "exit" ? 0 : 1,
        transform: phase === "exit" ? "scale(1.03)" : "scale(1)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {/* subtle radial glow behind icon */}
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          animation: "glowPulse 2s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          background: "#6366F1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          animation: "iconPulse 2s ease-in-out infinite",
          boxShadow: "0 0 0 0 rgba(99,102,241,0.4)",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <polyline
            points="4,30 14,18 22,24 36,8"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="36" cy="8" r="3.5" fill="white" />
          {/* spark lines */}
          <line x1="36" y1="1" x2="36" y2="3.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="39.5" y1="4" x2="38" y2="5.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="41" y1="8" x2="38.5" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* wordmark */}
      <div
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: "-1.5px",
          color: "white",
          marginBottom: 6,
          animation: "fadeUp 0.6s ease forwards",
          opacity: 0,
          animationDelay: "0.1s",
        }}
      >
        Trend<span style={{ color: "#818CF8" }}>ly</span>
      </div>

      {/* tagline */}
      <p
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 11,
          letterSpacing: "3px",
          color: "#4B5563",
          margin: "0 0 32px",
          animation: "fadeUp 0.6s ease forwards",
          opacity: 0,
          animationDelay: "0.25s",
        }}
      >
        CONNECT · SHARE · GROW
      </p>

      {/* equalizer bars */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 6,
          height: 36,
          animation: "fadeUp 0.6s ease forwards",
          opacity: 0,
          animationDelay: "0.4s",
        }}
      >
        {[
          { h: 14, delay: "0s",    dur: "0.9s"  },
          { h: 24, delay: "0.15s", dur: "1.1s"  },
          { h: 10, delay: "0.3s",  dur: "0.85s" },
          { h: 28, delay: "0.08s", dur: "1.0s"  },
          { h: 18, delay: "0.22s", dur: "0.95s" },
          { h: 8,  delay: "0.38s", dur: "1.15s" },
          { h: 22, delay: "0.12s", dur: "0.88s" },
        ].map((bar, i) => (
          <div
            key={i}
            style={{
              width: 5,
              height: bar.h,
              borderRadius: 3,
              background: `rgba(99,102,241,${0.5 + i * 0.07})`,
              animation: `bar ${bar.dur} ease-in-out ${bar.delay} infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes iconPulse {
          0%, 100% { transform: scale(1);    box-shadow: 0 0 0  0px rgba(99,102,241,0.4); }
          50%       { transform: scale(1.06); box-shadow: 0 0 0 16px rgba(99,102,241,0);   }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(0.95); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes bar {
          0%, 100% { transform: scaleY(0.35); }
          50%       { transform: scaleY(1);    }
        }
      `}</style>
    </div>
  );
}
