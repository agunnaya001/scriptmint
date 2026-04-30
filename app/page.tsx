"use client";
import { useState, useEffect } from "react";

const PILLARS = [
  { id: "build", label: "Build in Public", icon: "⛏", color: "#f97316" },
  { id: "edu",   label: "Educate Web3",    icon: "⬡", color: "#22d3ee" },
  { id: "money", label: "Money & Career",  icon: "◈", color: "#a78bfa" },
  { id: "bts",   label: "Dev Life BTS",    icon: "✦", color: "#34d399" },
];

const FORMATS = [
  { id: "screen",   label: "Screen Record", icon: "▣" },
  { id: "textcard", label: "Text Cards",    icon: "≡" },
  { id: "both",     label: "Mixed",         icon: "⊞" },
];

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

const CALENDAR_TOPICS = [
  { day: 1,  pillar: "build", title: "I'm building an NFT that lives on-chain forever — Day 1" },
  { day: 2,  pillar: "bts",   title: "My Web3 dev setup — VS Code, Foundry & Scaffold-ETH 2" },
  { day: 3,  pillar: "edu",   title: "5 things I wish I knew before writing my first smart contract" },
  { day: 4,  pillar: "edu",   title: "What an NFT contract actually looks like inside" },
  { day: 5,  pillar: "edu",   title: "Why 99% of NFTs will disappear — and mine won't" },
  { day: 6,  pillar: "build", title: "OnChainArt build log — Day 6 progress" },
  { day: 7,  pillar: "edu",   title: "On-chain NFT vs regular NFT (most people get this wrong)" },
  { day: 8,  pillar: "edu",   title: "Writing an ERC-721 contract from scratch in 10 minutes" },
  { day: 9,  pillar: "edu",   title: "What actually happens when you mint an NFT" },
  { day: 10, pillar: "build", title: "How I generate SVG art entirely on-chain — no IPFS" },
  { day: 11, pillar: "money", title: "Web3 dev salaries are insane — here's the proof" },
  { day: 12, pillar: "build", title: "Running my first Foundry test live" },
  { day: 13, pillar: "money", title: "3 reasons Solidity is the most valuable skill in 2025" },
  { day: 14, pillar: "build", title: "OnChainArt week 2 recap — what I shipped" },
  { day: 15, pillar: "edu",   title: "Hot take: most NFT projects are just JPEGs on a server" },
  { day: 16, pillar: "bts",   title: "I broke my smart contract — watch me debug it live" },
  { day: 17, pillar: "edu",   title: "What is base64 encoding and why your NFT needs it" },
  { day: 18, pillar: "bts",   title: "Scaffold-ETH 2 makes building dApps embarrassingly easy" },
  { day: 19, pillar: "build", title: "The 24KB contract limit almost killed my project" },
  { day: 20, pillar: "build", title: "Generating 100% unique SVG art from blockchain data" },
  { day: 21, pillar: "bts",   title: "Week 3 of building in public — wins and failures" },
  { day: 22, pillar: "edu",   title: "What does on-chain generative art actually look like?" },
  { day: 23, pillar: "bts",   title: "I asked AI to review my smart contract — here's what it found" },
  { day: 24, pillar: "edu",   title: "tokenURI explained in 60 seconds" },
  { day: 25, pillar: "build", title: "My NFT project goes live soon — everything I built" },
  { day: 26, pillar: "build", title: "Final contract walkthrough before launch — OnChainArt" },
  { day: 27, pillar: "build", title: "From zero to on-chain NFT — my full journey in 60 seconds" },
  { day: 28, pillar: "build", title: "Live deploying my NFT contract to testnet" },
  { day: 29, pillar: "bts",   title: "What I learned building a fully on-chain NFT from scratch" },
  { day: 30, pillar: "build", title: "OnChainArt is almost live — how to mint and why it's different" },
];

const G = {
  bg: "#07080d", surface: "#0d0e16", border: "#1c1d2e",
  accent: "#f97316", dim: "#3a3b52", muted: "#6b6c85", text: "#e2e3f0", white: "#ffffff",
};

function pillarColor(id: string) { return PILLARS.find(p => p.id === id)?.color || G.accent; }
function pillarLabel(id: string) { return PILLARS.find(p => p.id === id)?.label || id; }

function CopyBtn({ text, label = "Copy" }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000); }}
      style={{ background: G.surface, border: `1px solid ${ok ? "#34d399" : G.border}`, color: ok ? "#34d399" : G.muted, padding: "5px 12px", borderRadius: 3, fontFamily: "'DM Mono',monospace", fontSize: 11, cursor: "pointer", transition: "all .15s" }}
    >
      {ok ? "✓ Copied" : label}
    </button>
  );
}

export default function ScriptMint() {
  const [view, setView] = useState("generate");
  const [pillar, setPillar] = useState<string | null>(null);
  const [format, setFormat] = useState<string | null>(null);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [seriesDay, setSeriesDay] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem("scriptmint_history");
    const savedDay = localStorage.getItem("scriptmint_day");
    if (saved) setHistory(JSON.parse(saved));
    if (savedDay) setSeriesDay(parseInt(savedDay));
  }, []);

  const generate = async () => {
    if (!pillar || !format || !topic.trim()) return;
    setLoading(true); setResult(null); setError(null);
    const p = PILLARS.find(x => x.id === pillar);
    const f = FORMATS.find(x => x.id === format);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pillar: p?.label, format: f?.label, topic, seriesDay }),
      });
      const parsed = await res.json();
      if (parsed.error) throw new Error(parsed.error);
      setResult(parsed);
      const newHistory = [{ ...parsed, pillar, format, topic, date: new Date().toLocaleDateString(), seriesDay }, ...history].slice(0, 30);
      setHistory(newHistory);
      localStorage.setItem("scriptmint_history", JSON.stringify(newHistory));
      const nextDay = seriesDay + 1;
      setSeriesDay(nextDay);
      localStorage.setItem("scriptmint_day", String(nextDay));
    } catch (e) { setError("Generation failed — try again."); }
    setLoading(false);
  };

  const fullScript = result
    ? result.script.map((s: any) =>
        s.type === "action" ? `[SCREEN: ${s.content}]` :
        s.type === "textcard" ? `[TEXT CARD: ${s.content}]` : s.content
      ).join("\n") : "";

  const navStyle = (id: string) => ({
    background: "none", border: "none", fontFamily: "'DM Mono',monospace", fontSize: 12,
    letterSpacing: ".08em", color: view === id ? G.accent : G.muted, cursor: "pointer",
    padding: "8px 14px", borderRadius: 3, transition: "all .15s", textTransform: "uppercase" as const,
    backgroundColor: view === id ? "#f9731610" : "transparent",
  });

  const pillStyle = (active: boolean, color?: string) => ({
    background: active ? color || G.accent : "none",
    border: `1.5px solid ${active ? color || G.accent : G.border}`,
    fontFamily: "'DM Mono',monospace", fontSize: 12,
    color: active ? "#07080d" : G.muted, cursor: "pointer",
    padding: "9px 16px", borderRadius: 3, transition: "all .18s",
    display: "flex", alignItems: "center", gap: 8,
  });

  return (
    <div style={{ minHeight: "100vh", background: G.bg, color: G.text, fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#f97316}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .fade-up{animation:fadeUp .35s ease forwards}
        .spin{animation:spin .7s linear infinite}
        textarea{background:${G.surface};border:1.5px solid ${G.border};border-radius:4px;color:${G.text};font-family:'DM Mono',monospace;font-size:13px;padding:12px 14px;width:100%;outline:none;transition:border-color .2s;resize:vertical}
        textarea:focus{border-color:${G.accent}}
        .block-v{border-left:2.5px solid #34d399;background:#0d1812;padding:10px 14px;margin-bottom:6px;border-radius:0 4px 4px 0}
        .block-t{border-left:2.5px solid #22d3ee;background:#0a1217;padding:10px 14px;margin-bottom:6px;border-radius:0 4px 4px 0}
        .block-a{border-left:2.5px solid #f97316;background:#130f08;padding:10px 14px;margin-bottom:6px;border-radius:0 4px 4px 0}
        .tag{display:inline-block;background:#1a1020;border:1px solid #a78bfa30;color:#a78bfa;padding:3px 10px;border-radius:2px;font-size:11px;margin:2px;font-family:'DM Mono',monospace}
        .hook-card{background:${G.surface};border:1px solid ${G.border};border-radius:4px;padding:14px;cursor:pointer;transition:all .15s;margin-bottom:8px}
        .hook-card:hover{border-color:${G.accent};background:#130f08}
        .cal-item{background:${G.surface};border:1px solid ${G.border};border-radius:4px;padding:12px 14px;display:flex;gap:12px;align-items:flex-start;transition:border-color .15s;margin-bottom:8px}
      `}</style>

      {/* HEADER */}
      <header style={{ borderBottom: `1px solid ${G.border}`, padding: "0 28px", display: "flex", alignItems: "center", gap: 24, height: 56, position: "sticky", top: 0, background: G.bg, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 8 }}>
          <div style={{ width: 30, height: 30, background: G.accent, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>⬡</div>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: ".06em", color: G.white }}>
            SCRIPT<span style={{ color: G.accent }}>MINT</span>
          </span>
        </div>
        <nav style={{ display: "flex", gap: 2, flex: 1 }}>
          {[["generate", "Generate"], ["calendar", "Calendar"], ["history", "History"], ["hooks", "Hook Library"]].map(([id, label]) => (
            <button key={id} style={navStyle(id)} onClick={() => setView(id)}>{label}</button>
          ))}
        </nav>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: G.muted }}>
          Day <span style={{ color: G.accent }}>{seriesDay}</span>
        </div>
      </header>

      <main style={{ maxWidth: 780, margin: "0 auto", padding: "32px 20px" }}>

        {/* GENERATE */}
        {view === "generate" && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: ".04em", color: G.white, lineHeight: 1 }}>
                MINT YOUR<br /><span style={{ color: G.accent }}>DAILY SCRIPT</span>
              </div>
              <div style={{ color: G.muted, fontSize: 13, marginTop: 8, fontFamily: "'DM Mono',monospace" }}>Series day #{seriesDay} · Web3 Creator Engine</div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 10 }}>Content Pillar</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {PILLARS.map(p => (
                  <button key={p.id} style={pillStyle(pillar === p.id, p.color)} onClick={() => setPillar(p.id)}>
                    <span>{p.icon}</span>{p.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 10 }}>Video Format</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {FORMATS.map(f => (
                  <button key={f.id} style={pillStyle(format === f.id, "#22d3ee")} onClick={() => setFormat(f.id)}>
                    <span>{f.icon}</span>{f.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 10 }}>Topic / Idea</div>
              <textarea rows={3} placeholder="e.g. 'Why on-chain SVGs outlive IPFS NFTs' or 'Show my Foundry test passing live'" value={topic} onChange={e => setTopic(e.target.value)} />
              <div style={{ fontSize: 11, color: G.dim, marginTop: 6, fontFamily: "'DM Mono',monospace" }}>More detail = better script</div>
            </div>

            <button
              disabled={!pillar || !format || !topic.trim() || loading}
              onClick={generate}
              style={{ background: (!pillar || !format || !topic.trim() || loading) ? G.dim : G.accent, color: "#07080d", border: "none", padding: "14px 28px", fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 600, borderRadius: 4, cursor: (!pillar || !format || !topic.trim() || loading) ? "not-allowed" : "pointer", width: "100%", opacity: (!pillar || !format || !topic.trim() || loading) ? 0.4 : 1 }}
            >
              {loading ? "⟳  Minting script..." : "⬡  Mint Script"}
            </button>

            {loading && (
              <div style={{ textAlign: "center", padding: "40px 0", color: G.muted }}>
                <div className="spin" style={{ width: 28, height: 28, border: `2px solid ${G.border}`, borderTopColor: G.accent, borderRadius: "50%", margin: "0 auto 14px" }} />
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: ".1em" }}>GENERATING...</div>
              </div>
            )}

            {error && <div style={{ marginTop: 20, background: "#1a0a0a", border: "1px solid #ef444440", borderRadius: 4, padding: 14, color: "#f87171", fontSize: 13 }}>{error}</div>}

            {result && (
              <div className="fade-up" style={{ marginTop: 36 }}>
                {/* Title + Hooks */}
                <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 6, padding: 20, marginBottom: 16 }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: G.white, letterSpacing: ".03em", lineHeight: 1.2, marginBottom: 18 }}>{result.title}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 10 }}>Hook A/B/C Test</div>
                  {[result.hook, result.hook_b, result.hook_c].filter(Boolean).map((h: string, i: number) => (
                    <div key={i} style={{ background: G.bg, border: `1px solid ${i === 0 ? G.accent : G.border}`, borderRadius: 4, padding: "10px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: i === 0 ? G.accent : G.muted, flexShrink: 0 }}>Hook {String.fromCharCode(65 + i)}</span>
                        <span style={{ fontSize: 13, color: i === 0 ? G.white : G.text }}>"{h}"</span>
                      </div>
                      <CopyBtn text={h} label="Use" />
                    </div>
                  ))}
                  {result.format_notes && <div style={{ marginTop: 10, fontSize: 12, color: G.muted, fontStyle: "italic" }}>💡 {result.format_notes}</div>}
                </div>

                {/* Script */}
                <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 6, padding: 20, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: ".12em", textTransform: "uppercase" }}>Full Script</div>
                    <CopyBtn text={fullScript} label="Copy All" />
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: 10, color: G.muted, marginBottom: 12, fontFamily: "'DM Mono',monospace" }}>
                    <span><span style={{ color: "#34d399" }}>▌</span> Voiceover</span>
                    <span><span style={{ color: "#22d3ee" }}>▌</span> Text Card</span>
                    <span><span style={{ color: G.accent }}>▌</span> Screen Action</span>
                  </div>
                  {result.script.map((b: any, i: number) => (
                    <div key={i} className={`block-${b.type === "voiceover" ? "v" : b.type === "textcard" ? "t" : "a"}`}>
                      <div style={{ fontSize: 10, color: G.muted, marginBottom: 4, fontFamily: "'DM Mono',monospace", display: "flex", gap: 8 }}>
                        <span>{b.type === "voiceover" ? "🎙 Voiceover" : b.type === "textcard" ? "📝 Text Card" : "🖥 Screen"}</span>
                        {b.duration && <span style={{ color: G.dim }}>{b.duration}</span>}
                      </div>
                      <div style={{ fontSize: 13, lineHeight: 1.65 }}>{b.content}</div>
                    </div>
                  ))}
                </div>

                {/* Caption */}
                <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 6, padding: 20, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: ".12em", textTransform: "uppercase" }}>Caption</div>
                    <CopyBtn text={[...result.captions, "", result.cta || "", "", result.hashtags.map((h: string) => `#${h.replace("#", "")}`).join(" ")].join("\n")} label="Copy Caption" />
                  </div>
                  {result.captions.map((l: string, i: number) => <div key={i} style={{ fontSize: 13, color: G.text, marginBottom: 4 }}>{l}</div>)}
                  {result.cta && <div style={{ marginTop: 10, fontSize: 13, color: G.accent }}>{result.cta}</div>}
                  <div style={{ marginTop: 12 }}>{result.hashtags.map((t: string, i: number) => <span key={i} className="tag">#{t.replace("#", "")}</span>)}</div>
                </div>

                {/* Repurpose */}
                <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 6, padding: 20, marginBottom: 16 }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 14 }}>Repurpose This Video</div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                    {[["𝕏 Twitter Thread", result.repurpose_tweet], ["in LinkedIn", result.repurpose_linkedin]].map(([platform, text], i) => (
                      <div key={i} style={{ flex: 1, minWidth: 220, background: G.bg, border: `1px solid ${G.border}`, borderRadius: 4, padding: 14 }}>
                        <div style={{ fontSize: 10, color: G.muted, fontFamily: "'DM Mono',monospace", marginBottom: 6 }}>{platform}</div>
                        <div style={{ fontSize: 13, color: G.text, lineHeight: 1.6 }}>{text}</div>
                        <div style={{ marginTop: 10 }}><CopyBtn text={text || ""} label="Copy" /></div>
                      </div>
                    ))}
                  </div>
                </div>

                {result.capcut_tip && (
                  <div style={{ background: "#0a0c18", border: "1px solid #22d3ee20", borderRadius: 4, padding: "12px 16px", fontSize: 13, color: "#93c5fd", marginBottom: 16 }}>
                    <span style={{ color: "#22d3ee", fontFamily: "'DM Mono',monospace", fontSize: 10, display: "block", marginBottom: 4, letterSpacing: ".1em" }}>CAPCUT TIP</span>
                    {result.capcut_tip}
                  </div>
                )}

                <button onClick={generate} style={{ background: "transparent", border: `1.5px solid ${G.accent}`, color: G.accent, padding: "14px 28px", fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 600, borderRadius: 4, cursor: "pointer", width: "100%" }}>
                  ↺  Regenerate New Version
                </button>
              </div>
            )}
          </div>
        )}

        {/* CALENDAR */}
        {view === "calendar" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: ".04em", color: G.white }}>30-DAY <span style={{ color: G.accent }}>CONTENT CALENDAR</span></div>
              <div style={{ color: G.muted, fontSize: 13, fontFamily: "'DM Mono',monospace", marginTop: 6 }}>Your pre-planned OnChainArt launch roadmap</div>
            </div>
            {CALENDAR_TOPICS.map(item => {
              const color = pillarColor(item.pillar);
              const done = item.day < seriesDay;
              return (
                <div key={item.day} className="cal-item" style={{ borderColor: done ? G.border : item.day === seriesDay ? color : G.border, opacity: done ? 0.5 : 1 }}>
                  <div style={{ minWidth: 32, height: 32, borderRadius: 3, background: done ? "#111" : item.day === seriesDay ? color : "#111", border: `1px solid ${done ? G.border : color}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, color: done ? G.dim : item.day === seriesDay ? "#07080d" : color, flexShrink: 0 }}>
                    {done ? "✓" : item.day}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: done ? G.muted : G.text, textDecoration: done ? "line-through" : "none" }}>{item.title}</div>
                    <div style={{ fontSize: 10, color, fontFamily: "'DM Mono',monospace", marginTop: 3 }}>{pillarLabel(item.pillar)}</div>
                  </div>
                  {item.day === seriesDay && (
                    <button onClick={() => { setTopic(item.title); setPillar(item.pillar); setView("generate"); }}
                      style={{ background: color, border: "none", color: "#07080d", fontSize: 11, padding: "5px 12px", borderRadius: 3, cursor: "pointer", fontFamily: "'DM Mono',monospace", flexShrink: 0 }}>
                      Generate →
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* HISTORY */}
        {view === "history" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: ".04em", color: G.white }}>SCRIPT <span style={{ color: G.accent }}>HISTORY</span></div>
              <div style={{ color: G.muted, fontSize: 13, fontFamily: "'DM Mono',monospace", marginTop: 6 }}>{history.length} scripts saved</div>
            </div>
            {history.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: G.muted }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>⬡</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 13 }}>No scripts yet — mint your first one</div>
                <button onClick={() => setView("generate")} style={{ marginTop: 16, background: "none", border: "none", color: G.accent, fontFamily: "'DM Mono',monospace", fontSize: 12, cursor: "pointer" }}>Go to Generate →</button>
              </div>
            ) : history.map((h: any, i: number) => (
              <div key={i} style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 6, padding: 20, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, color: G.white, fontWeight: 600, marginBottom: 6 }}>{h.title}</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 10, color: pillarColor(h.pillar), fontFamily: "'DM Mono',monospace" }}>{pillarLabel(h.pillar)}</span>
                      <span style={{ color: G.dim }}>·</span>
                      <span style={{ fontSize: 10, color: G.muted, fontFamily: "'DM Mono',monospace" }}>Day {h.seriesDay} · {h.date}</span>
                    </div>
                  </div>
                  <CopyBtn text={h.script?.map((s: any) => s.content).join("\n") || ""} label="Copy Script" />
                </div>
                <div style={{ marginTop: 12, fontSize: 12, color: G.muted, fontStyle: "italic", borderTop: `1px solid ${G.border}`, paddingTop: 10 }}>Hook: "{h.hook}"</div>
              </div>
            ))}
          </div>
        )}

        {/* HOOKS */}
        {view === "hooks" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: ".04em", color: G.white }}>HOOK <span style={{ color: G.accent }}>LIBRARY</span></div>
              <div style={{ color: G.muted, fontSize: 13, fontFamily: "'DM Mono',monospace", marginTop: 6 }}>Proven Web3 hooks — tap to use as your video topic</div>
            </div>
            {HOOK_LIBRARY.map((hook, i) => (
              <div key={i} className="hook-card" onClick={() => { setTopic(hook); setView("generate"); }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: G.dim, flexShrink: 0, marginTop: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 13, color: G.text, lineHeight: 1.5 }}>"{hook}"</span>
                  </div>
                  <span style={{ color: G.accent, fontSize: 16, flexShrink: 0 }}>→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
