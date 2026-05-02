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
