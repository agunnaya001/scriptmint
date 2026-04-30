"use client";

const HOOK_LIBRARY = [
  "I built something that will outlive every IPFS NFT ever made.",
  "99% of NFTs will disappear. Here's the 1% that won't.",
  "Watch me deploy a smart contract in under 60 seconds.",
  "This one Solidity trick saves thousands in gas fees.",
  "Web3 devs are printing money and nobody is talking about it.",
  "I broke my smart contract live on stream — here's what happened.",
  "The 24KB limit almost killed my NFT project.",
  "What actually happens when you mint an NFT (most people have no idea).",
  "On-chain SVG art vs IPFS — only one survives the blockchain.",
  "Scaffold-ETH 2 makes building dApps embarrassingly easy.",
  "I wrote 500 lines of Solidity in one day — here's what I shipped.",
  "Your NFT metadata is stored on a server. Mine isn't. Here's why that matters.",
  "Foundry tests > everything. Let me show you.",
  "ERC-721 from scratch in 60 seconds — no frameworks, no fluff.",
  "This is what a $50k/month Web3 freelance stack looks like.",
];

interface HookLibraryTabProps {
  G: any;
  setView: (view: string) => void;
}

export default function HookLibraryTab({ G, setView }: HookLibraryTabProps) {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 36,
            letterSpacing: ".04em",
            color: G.white,
          }}
        >
          HOOK <span style={{ color: G.accent }}>LIBRARY</span>
        </div>
        <div
          style={{
            color: G.muted,
            fontSize: 13,
            fontFamily: "'DM Mono',monospace",
            marginTop: 6,
          }}
        >
          Proven Web3 hooks — tap to use as your video topic
        </div>
      </div>
      {HOOK_LIBRARY.map((hook, i) => (
        <div
          key={i}
          className="hook-card"
          onClick={() => setView("generate")}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 11,
                  color: G.dim,
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: G.text,
                  lineHeight: 1.5,
                }}
              >
                "{hook}"
              </span>
            </div>
            <span
              style={{
                color: G.accent,
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              →
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
