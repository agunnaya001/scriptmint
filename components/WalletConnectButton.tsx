"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function WalletConnectButton() {
  return (
    <ConnectButton
      accountStatus="avatar"
      chainStatus="icon"
      showBalance={false}
      label="Connect Wallet"
    />
  );
}
