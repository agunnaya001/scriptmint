"use client";

import { useBaseIntegration } from "@/hooks/useBaseIntegration";

export function BaseStatus() {
  const { walletConnected, isBase } = useBaseIntegration();

  if (!walletConnected) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "11px",
        fontFamily: "'DM Mono',monospace",
        color: isBase ? "#00d4ff" : "#a9a1b8",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: isBase ? "#00d4ff" : "#f97316",
        }}
      />
      {isBase ? "Base Mainnet Connected" : "Switch to Base"}
    </div>
  );
}
