"use client";
import { useState } from "react";

interface CopyBtnProps {
  text: string;
  label?: string;
  G?: any;
}

export function CopyBtn({ text, label = "Copy", G }: CopyBtnProps) {
  const [ok, setOk] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setOk(true);
        setTimeout(() => setOk(false), 2000);
      }}
      style={{
        background: G ? G.surface : "#0d0e16",
        border: `1px solid ${ok ? "#34d399" : G ? G.border : "#1c1d2e"}`,
        color: ok ? "#34d399" : G ? G.muted : "#6b6c85",
        padding: "5px 12px",
        borderRadius: 3,
        fontFamily: "'DM Mono',monospace",
        fontSize: 11,
        cursor: "pointer",
        transition: "all .15s",
      }}
    >
      {ok ? "✓ Copied" : label}
    </button>
  );
}
