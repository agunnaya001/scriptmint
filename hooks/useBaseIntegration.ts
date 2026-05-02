"use client";

import { useAccount, useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface BaseFeatures {
  walletConnected: boolean;
  address: string | null;
  isBase: boolean;
  canSaveOnChain: boolean;
}

export function useBaseIntegration(): BaseFeatures {
  const { address, chain } = useAccount();
  const [features, setFeatures] = useState<BaseFeatures>({
    walletConnected: false,
    address: null,
    isBase: false,
    canSaveOnChain: false,
  });

  useEffect(() => {
    setFeatures({
      walletConnected: !!address,
      address: address || null,
      isBase: chain?.id === 8453, // Base mainnet chain ID
      canSaveOnChain: !!address && chain?.id === 8453,
    });
  }, [address, chain]);

  return features;
}

export function BaseStatus() {
  const { walletConnected, isBase, address } = useBaseIntegration();

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

export async function saveScriptOnChain(
  scriptId: string,
  title: string,
  hook: string,
  address: string
) {
  try {
    // This would integrate with a smart contract to record the script on Base
    // For now, emit a structured event that can be listened to
    const event = new CustomEvent("scriptSavedOnChain", {
      detail: {
        scriptId,
        title,
        hook,
        address,
        timestamp: Date.now(),
      },
    });
    window.dispatchEvent(event);
    return { success: true, message: "Script queued for Base recording" };
  } catch (error) {
    console.error("Error saving script on-chain:", error);
    return { success: false, message: "Failed to save on-chain" };
  }
}
