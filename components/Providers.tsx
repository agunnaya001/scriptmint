"use client";

import { WagmiConfig, createClient, configureChains } from "wagmi";
import { base, mainnet, sepolia } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode, useMemo } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const { chains, provider } = useMemo(() => {
    return configureChains(
      [base, mainnet, sepolia],
      [publicProvider()]
    );
  }, []);

  const wagmiClient = useMemo(
    () =>
      createClient({
        autoConnect: true,
        connectors: [
          new MetaMaskConnector({ chains }),
          new InjectedConnector({ chains }),
        ],
        provider,
      }),
    [chains, provider]
  );

  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <WagmiConfig client={wagmiClient}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains} theme="dark">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
