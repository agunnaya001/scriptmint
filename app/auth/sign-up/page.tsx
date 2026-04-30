"use client";
import { SignUp } from "@clerk/nextjs";

const G = {
  bg: "#07080d",
  surface: "#0d0e16",
  border: "#1c1d2e",
  accent: "#f97316",
};

export default function SignUpPage() {
  return (
    <div style={{ minHeight: "100vh", background: G.bg, color: G.accent, fontFamily: "'DM Sans',sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
        :root {
          --color-brand: ${G.accent};
          --color-bg: ${G.bg};
          --color-surface: ${G.surface};
          --color-border: ${G.border};
        }
      `}</style>
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, justifyContent: "center" }}>
          <div style={{ width: 40, height: 40, background: G.accent, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>⬡</div>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: ".06em", color: "#ffffff" }}>
            SCRIPT<span style={{ color: G.accent }}>MINT</span>
          </span>
        </div>
        <p style={{ color: "#6b6c85", fontFamily: "'DM Mono',monospace", fontSize: 13 }}>Create your account to start generating</p>
      </div>
      <div style={{ maxWidth: 400, width: "100%" }}>
        <SignUp appearance={{ variables: { colorPrimary: G.accent, colorBackground: G.surface, colorBorder: G.border, colorText: "#e2e3f0", colorInputBackground: G.surface, colorInputBorder: G.border } }} />
      </div>
    </div>
  );
}
