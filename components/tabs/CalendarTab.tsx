"use client";

const CALENDAR_TOPICS = [
  { day: 1, pillar: "build", title: "I'm building an NFT that lives on-chain forever — Day 1" },
  { day: 2, pillar: "bts", title: "My Web3 dev setup — VS Code, Foundry & Scaffold-ETH 2" },
  { day: 3, pillar: "edu", title: "5 things I wish I knew before writing my first smart contract" },
  { day: 4, pillar: "edu", title: "What an NFT contract actually looks like inside" },
  { day: 5, pillar: "edu", title: "Why 99% of NFTs will disappear — and mine won't" },
  { day: 6, pillar: "build", title: "OnChainArt build log — Day 6 progress" },
  { day: 7, pillar: "edu", title: "On-chain NFT vs regular NFT (most people get this wrong)" },
  { day: 8, pillar: "edu", title: "Writing an ERC-721 contract from scratch in 10 minutes" },
  { day: 9, pillar: "edu", title: "What actually happens when you mint an NFT" },
  { day: 10, pillar: "build", title: "How I generate SVG art entirely on-chain — no IPFS" },
  { day: 11, pillar: "money", title: "Web3 dev salaries are insane — here's the proof" },
  { day: 12, pillar: "build", title: "Running my first Foundry test live" },
  { day: 13, pillar: "money", title: "3 reasons Solidity is the most valuable skill in 2025" },
  { day: 14, pillar: "build", title: "OnChainArt week 2 recap — what I shipped" },
  { day: 15, pillar: "edu", title: "Hot take: most NFT projects are just JPEGs on a server" },
  { day: 16, pillar: "bts", title: "I broke my smart contract — watch me debug it live" },
  { day: 17, pillar: "edu", title: "What is base64 encoding and why your NFT needs it" },
  { day: 18, pillar: "bts", title: "Scaffold-ETH 2 makes building dApps embarrassingly easy" },
  { day: 19, pillar: "build", title: "The 24KB contract limit almost killed my project" },
  { day: 20, pillar: "build", title: "Generating 100% unique SVG art from blockchain data" },
  { day: 21, pillar: "bts", title: "Week 3 of building in public — wins and failures" },
  { day: 22, pillar: "edu", title: "What does on-chain generative art actually look like?" },
  { day: 23, pillar: "bts", title: "I asked AI to review my smart contract — here's what it found" },
  { day: 24, pillar: "edu", title: "tokenURI explained in 60 seconds" },
  { day: 25, pillar: "build", title: "My NFT project goes live soon — everything I built" },
  { day: 26, pillar: "build", title: "Final contract walkthrough before launch — OnChainArt" },
  { day: 27, pillar: "build", title: "From zero to on-chain NFT — my full journey in 60 seconds" },
  { day: 28, pillar: "build", title: "Live deploying my NFT contract to testnet" },
  { day: 29, pillar: "bts", title: "What I learned building a fully on-chain NFT from scratch" },
  { day: 30, pillar: "build", title: "OnChainArt is almost live — how to mint and why it's different" },
];

const PILLARS = [
  { id: "build", label: "Build in Public", color: "#f97316" },
  { id: "edu", label: "Educate Web3", color: "#22d3ee" },
  { id: "money", label: "Money & Career", color: "#a78bfa" },
  { id: "bts", label: "Dev Life BTS", color: "#34d399" },
];

function pillarColor(id: string) {
  return PILLARS.find((p) => p.id === id)?.color || "#f97316";
}

function pillarLabel(id: string) {
  return PILLARS.find((p) => p.id === id)?.label || id;
}

interface CalendarTabProps {
  G: any;
  seriesDay: number;
  setView: (view: string) => void;
}

export default function CalendarTab({ G, seriesDay, setView }: CalendarTabProps) {
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
          30-DAY <span style={{ color: G.accent }}>CONTENT CALENDAR</span>
        </div>
        <div
          style={{
            color: G.muted,
            fontSize: 13,
            fontFamily: "'DM Mono',monospace",
            marginTop: 6,
          }}
        >
          Your pre-planned OnChainArt launch roadmap
        </div>
      </div>
      {CALENDAR_TOPICS.map((item) => {
        const color = pillarColor(item.pillar);
        const done = item.day < seriesDay;
        return (
          <div
            key={item.day}
            className="cal-item"
            style={{
              borderColor: done ? G.border : item.day === seriesDay ? color : G.border,
              opacity: done ? 0.5 : 1,
            }}
          >
            <div
              style={{
                minWidth: 32,
                height: 32,
                borderRadius: 3,
                background: done ? "#111" : item.day === seriesDay ? color : "#111",
                border: `1px solid ${done ? G.border : color}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 15,
                color: done ? G.dim : item.day === seriesDay ? "#07080d" : color,
                flexShrink: 0,
              }}
            >
              {done ? "✓" : item.day}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 13,
                  color: done ? G.muted : G.text,
                  textDecoration: done ? "line-through" : "none",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color,
                  fontFamily: "'DM Mono',monospace",
                  marginTop: 3,
                }}
              >
                {pillarLabel(item.pillar)}
              </div>
            </div>
            {item.day === seriesDay && (
              <button
                onClick={() => setView("generate")}
                style={{
                  background: color,
                  border: "none",
                  color: "#07080d",
                  fontSize: 11,
                  padding: "5px 12px",
                  borderRadius: 3,
                  cursor: "pointer",
                  fontFamily: "'DM Mono',monospace",
                  flexShrink: 0,
                }}
              >
                Generate →
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
