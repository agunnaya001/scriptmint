"use client";

import { WagmiProvider } from "wagmi";
import { base, mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode, useMemo } from "react";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID";

export default function Providers({ children }: { children: ReactNode }) {
  const config = useMemo(() => {
    return getDefaultConfig({
      appName: "ScriptMint",
      projectId,
      chains: [base, mainnet, sepolia],
      ssr: true,
    });
  }, []);

  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme="dark"
          modalSize="compact"
          showRecentTransactions={true}
          coolMode={true}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
