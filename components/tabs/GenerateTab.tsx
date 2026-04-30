"use client";
import { useState } from "react";
import { CopyBtn } from "@/components/CopyBtn";
import { ThumbnailPreview } from "@/components/ThumbnailPreview";

const PILLARS = [
  { id: "build", label: "Build in Public", icon: "⛏", color: "#f97316" },
  { id: "edu", label: "Educate Web3", icon: "⬡", color: "#22d3ee" },
  { id: "money", label: "Money & Career", icon: "◈", color: "#a78bfa" },
  { id: "bts", label: "Dev Life BTS", icon: "✦", color: "#34d399" },
];

const FORMATS = [
  { id: "screen", label: "Screen Record", icon: "▣" },
  { id: "textcard", label: "Text Cards", icon: "≡" },
  { id: "both", label: "Mixed", icon: "⊞" },
];

interface GenerateTabProps {
  G: any;
  user: any;
  supabase: any;
  seriesDay: number;
  onGenerated: () => void;
}

export default function GenerateTab({ G, user, supabase, seriesDay, onGenerated }: GenerateTabProps) {
  const [pillar, setPillar] = useState<string | null>(null);
  const [format, setFormat] = useState<string | null>(null);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatingThumbnail, setGeneratingThumbnail] = useState(false);

  const generate = async () => {
    if (!pillar || !format || !topic.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    const p = PILLARS.find((x) => x.id === pillar);
    const f = FORMATS.find((x) => x.id === format);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pillar: p?.label,
          format: f?.label,
          topic,
          seriesDay,
        }),
      });

      const parsed = await res.json();
      if (parsed.error) throw new Error(parsed.error);
      setResult(parsed);

      // Auto-save to Supabase
      await saveScript(parsed);
    } catch (e) {
      setError("Generation failed — try again.");
    }
    setLoading(false);
  };

  const saveScript = async (scriptData: any) => {
    try {
      const { error: insertError } = await supabase.from("scripts").insert({
        user_id: user.id,
        title: scriptData.title,
        hook: scriptData.hook,
        hook_b: scriptData.hook_b,
        hook_c: scriptData.hook_c,
        script: scriptData.script,
        captions: scriptData.captions,
        hashtags: scriptData.hashtags,
        cta: scriptData.cta,
        format_notes: scriptData.format_notes,
        pillar,
        format,
        topic,
        series_day: seriesDay,
      });

      if (insertError) throw insertError;
      onGenerated();
    } catch (err) {
      console.error("Error saving script:", err);
    }
  };

  const fullScript = result
    ? result.script
        .map((s: any) =>
          s.type === "action"
            ? `[SCREEN: ${s.content}]`
            : s.type === "textcard"
            ? `[TEXT CARD: ${s.content}]`
            : s.content
        )
        .join("\n")
    : "";

  const pillStyle = (active: boolean, color?: string) => ({
    background: active ? color || G.accent : "none",
    border: `1.5px solid ${active ? color || G.accent : G.border}`,
    fontFamily: "'DM Mono',monospace",
    fontSize: 12,
    color: active ? "#07080d" : G.muted,
    cursor: "pointer",
    padding: "9px 16px",
    borderRadius: 3,
    transition: "all .18s",
    display: "flex",
    alignItems: "center",
    gap: 8,
  });

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 36,
            letterSpacing: ".04em",
            color: G.white,
            lineHeight: 1,
          }}
        >
          MINT YOUR<br />
          <span style={{ color: G.accent }}>DAILY SCRIPT</span>
        </div>
        <div
          style={{
            color: G.muted,
            fontSize: 13,
            marginTop: 8,
            fontFamily: "'DM Mono',monospace",
          }}
        >
          Series day #{seriesDay} · Web3 Creator Engine
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 10,
            color: G.muted,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Content Pillar
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {PILLARS.map((p) => (
            <button
              key={p.id}
              style={pillStyle(pillar === p.id, p.color)}
              onClick={() => setPillar(p.id)}
            >
              <span>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 10,
            color: G.muted,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Video Format
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {FORMATS.map((f) => (
            <button
              key={f.id}
              style={pillStyle(format === f.id, "#22d3ee")}
              onClick={() => setFormat(f.id)}
            >
              <span>{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 10,
            color: G.muted,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Topic / Idea
        </div>
        <textarea
          rows={3}
          placeholder="e.g. 'Why on-chain SVGs outlive IPFS NFTs' or 'Show my Foundry test passing live'"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <div
          style={{
            fontSize: 11,
            color: G.dim,
            marginTop: 6,
            fontFamily: "'DM Mono',monospace",
          }}
        >
          More detail = better script
        </div>
      </div>

      <button
        disabled={!pillar || !format || !topic.trim() || loading}
        onClick={generate}
        style={{
          background:
            !pillar || !format || !topic.trim() || loading ? G.dim : G.accent,
          color: "#07080d",
          border: "none",
          padding: "14px 28px",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 15,
          fontWeight: 600,
          borderRadius: 4,
          cursor:
            !pillar || !format || !topic.trim() || loading
              ? "not-allowed"
              : "pointer",
          width: "100%",
          opacity:
            !pillar || !format || !topic.trim() || loading ? 0.4 : 1,
        }}
      >
        {loading ? "⟳  Minting script..." : "⬡  Mint Script"}
      </button>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px 0", color: G.muted }}>
          <div
            className="spin"
            style={{
              width: 28,
              height: 28,
              border: `2px solid ${G.border}`,
              borderTopColor: G.accent,
              borderRadius: "50%",
              margin: "0 auto 14px",
            }}
          />
          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              letterSpacing: ".1em",
            }}
          >
            GENERATING...
          </div>
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: 20,
            background: "#1a0a0a",
            border: "1px solid #ef444440",
            borderRadius: 4,
            padding: 14,
            color: "#f87171",
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      {result && (
        <div className="fade-up" style={{ marginTop: 36 }}>
          {/* Thumbnail Preview */}
          <ThumbnailPreview G={G} hook={result.hook} pillar={pillar || "build"} />

          {/* Title + Hooks */}
          <div
            style={{
              background: G.surface,
              border: `1px solid ${G.border}`,
              borderRadius: 6,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 28,
                color: G.white,
                letterSpacing: ".03em",
                lineHeight: 1.2,
                marginBottom: 18,
              }}
            >
              {result.title}
            </div>
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                color: G.muted,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Hook A/B/C Test
            </div>
            {[result.hook, result.hook_b, result.hook_c]
              .filter(Boolean)
              .map((h: string, i: number) => (
                <div
                  key={i}
                  style={{
                    background: G.bg,
                    border: `1px solid ${i === 0 ? G.accent : G.border}`,
                    borderRadius: 4,
                    padding: "10px 14px",
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: 10,
                        color: i === 0 ? G.accent : G.muted,
                        flexShrink: 0,
                      }}
                    >
                      Hook {String.fromCharCode(65 + i)}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: i === 0 ? G.white : G.text,
                      }}
                    >
                      "{h}"
                    </span>
                  </div>
                  <CopyBtn text={h} label="Use" />
                </div>
              ))}
            {result.format_notes && (
              <div
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  color: G.muted,
                  fontStyle: "italic",
                }}
              >
                💡 {result.format_notes}
              </div>
            )}
          </div>

          {/* Script */}
          <div
            style={{
              background: G.surface,
              border: `1px solid ${G.border}`,
              borderRadius: 6,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  color: G.muted,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                }}
              >
                Full Script
              </div>
              <CopyBtn text={fullScript} label="Copy All" />
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                fontSize: 10,
                color: G.muted,
                marginBottom: 12,
                fontFamily: "'DM Mono',monospace",
              }}
            >
              <span>
                <span style={{ color: "#34d399" }}>▌</span> Voiceover
              </span>
              <span>
                <span style={{ color: "#22d3ee" }}>▌</span> Text Card
              </span>
              <span>
                <span style={{ color: G.accent }}>▌</span> Screen Action
              </span>
            </div>
            {result.script.map((b: any, i: number) => (
              <div
                key={i}
                className={`block-${
                  b.type === "voiceover"
                    ? "v"
                    : b.type === "textcard"
                    ? "t"
                    : "a"
                }`}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: G.muted,
                    marginBottom: 4,
                    fontFamily: "'DM Mono',monospace",
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <span>
                    {b.type === "voiceover"
                      ? "🎙 Voiceover"
                      : b.type === "textcard"
                      ? "📝 Text Card"
                      : "🖥 Screen"}
                  </span>
                  {b.duration && (
                    <span style={{ color: G.dim }}>{b.duration}</span>
                  )}
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.65 }}>
                  {b.content}
                </div>
              </div>
            ))}
          </div>

          {/* Caption */}
          <div
            style={{
              background: G.surface,
              border: `1px solid ${G.border}`,
              borderRadius: 6,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  color: G.muted,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                }}
              >
                Caption
              </div>
              <CopyBtn
                text={[
                  ...result.captions,
                  "",
                  result.cta || "",
                  "",
                  result.hashtags
                    .map((h: string) => `#${h.replace("#", "")}`)
                    .join(" "),
                ].join("\n")}
                label="Copy Caption"
              />
            </div>
            {result.captions.map((l: string, i: number) => (
              <div key={i} style={{ fontSize: 13, color: G.text, marginBottom: 4 }}>
                {l}
              </div>
            ))}
            {result.cta && (
              <div style={{ marginTop: 10, fontSize: 13, color: G.accent }}>
                {result.cta}
              </div>
            )}
            <div style={{ marginTop: 12 }}>
              {result.hashtags.map((t: string, i: number) => (
                <span key={i} className="tag">
                  #{t.replace("#", "")}
                </span>
              ))}
            </div>
          </div>

          {/* Repurpose */}
          <div
            style={{
              background: G.surface,
              border: `1px solid ${G.border}`,
              borderRadius: 6,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                color: G.muted,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Repurpose This Video
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              {[
                ["𝕏 Twitter Thread", result.repurpose_tweet],
                ["in LinkedIn", result.repurpose_linkedin],
              ].map(([platform, text], i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    minWidth: 220,
                    background: G.bg,
                    border: `1px solid ${G.border}`,
                    borderRadius: 4,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: G.muted,
                      fontFamily: "'DM Mono',monospace",
                      marginBottom: 6,
                    }}
                  >
                    {platform}
                  </div>
                  <div style={{ fontSize: 13, color: G.text, lineHeight: 1.6 }}>
                    {text}
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <CopyBtn text={text || ""} label="Copy" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {result.capcut_tip && (
            <div
              style={{
                background: "#0a0c18",
                border: "1px solid #22d3ee20",
                borderRadius: 4,
                padding: "12px 16px",
                fontSize: 13,
                color: "#93c5fd",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  color: "#22d3ee",
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  display: "block",
                  marginBottom: 4,
                  letterSpacing: ".1em",
                }}
              >
                CAPCUT TIP
              </span>
              {result.capcut_tip}
            </div>
          )}

          <button
            onClick={generate}
            style={{
              background: "transparent",
              border: `1.5px solid ${G.accent}`,
              color: G.accent,
              padding: "14px 28px",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 4,
              cursor: "pointer",
              width: "100%",
            }}
          >
            ↺  Regenerate New Version
          </button>
        </div>
      )}
    </div>
  );
}
