"use client";
import { CopyBtn } from "@/components/CopyBtn";

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

interface HistoryTabProps {
  G: any;
  history: any[];
  setView: (view: string) => void;
}

export default function HistoryTab({ G, history, setView }: HistoryTabProps) {
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
          SCRIPT <span style={{ color: G.accent }}>HISTORY</span>
        </div>
        <div
          style={{
            color: G.muted,
            fontSize: 13,
            fontFamily: "'DM Mono',monospace",
            marginTop: 6,
          }}
        >
          {history.length} scripts saved
        </div>
      </div>
      {history.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: G.muted }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⬡</div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 13 }}>
            No scripts yet — mint your first one
          </div>
          <button
            onClick={() => setView("generate")}
            style={{
              marginTop: 16,
              background: "none",
              border: "none",
              color: G.accent,
              fontFamily: "'DM Mono',monospace",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Go to Generate →
          </button>
        </div>
      ) : (
        history.map((h: any, i: number) => (
          <div
            key={i}
            style={{
              background: G.surface,
              border: `1px solid ${G.border}`,
              borderRadius: 6,
              padding: 20,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 14,
                    color: G.white,
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  {h.title}
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 10,
                      color: pillarColor(h.pillar),
                      fontFamily: "'DM Mono',monospace",
                    }}
                  >
                    {pillarLabel(h.pillar)}
                  </span>
                  <span style={{ color: G.dim }}>·</span>
                  <span
                    style={{
                      fontSize: 10,
                      color: G.muted,
                      fontFamily: "'DM Mono',monospace",
                    }}
                  >
                    Day {h.series_day} · {new Date(h.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <CopyBtn
                text={
                  h.script?.map((s: any) => s.content).join("\n") || ""
                }
                label="Copy Script"
              />
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 12,
                color: G.muted,
                fontStyle: "italic",
                borderTop: `1px solid ${G.border}`,
                paddingTop: 10,
              }}
            >
              Hook: "{h.hook}"
            </div>
          </div>
        ))
      )}
    </div>
  );
}
