"use client";
import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CopyBtn } from "@/components/CopyBtn";

const PILLARS = [
  { id: "build", label: "Build in Public", color: "#f97316" },
  { id: "edu", label: "Educate Web3", color: "#22d3ee" },
  { id: "money", label: "Money & Career", color: "#a78bfa" },
  { id: "bts", label: "Dev Life BTS", color: "#34d399" },
];

interface AnalyticsTabProps {
  G: any;
  user: any;
  supabase: any;
  history: any[];
}

export default function AnalyticsTab({ G, user, supabase, history }: AnalyticsTabProps) {
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [newEntry, setNewEntry] = useState({ views: "", likes: "", date: new Date().toISOString().split("T")[0] });
  const [selectedScript, setSelectedScript] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("analytics")
        .select("*")
        .eq("user_id", user.id)
        .order("entry_date", { ascending: true });

      if (error) throw error;
      setAnalyticsData(data || []);
    } catch (err) {
      console.error("Error loading analytics:", err);
    }
  };

  const addAnalyticsEntry = async () => {
    if (!selectedScript || !newEntry.views || !newEntry.likes) return;

    setSaving(true);
    try {
      const script = history.find((s) => s.id === selectedScript);
      if (!script) return;

      const { error } = await supabase.from("analytics").insert({
        user_id: user.id,
        script_id: selectedScript,
        views: parseInt(newEntry.views),
        likes: parseInt(newEntry.likes),
        pillar: script.pillar,
        format: script.format,
        hook: script.hook,
        entry_date: newEntry.date,
      });

      if (error) throw error;

      setNewEntry({ views: "", likes: "", date: new Date().toISOString().split("T")[0] });
      setSelectedScript("");
      await loadAnalytics();
    } catch (err) {
      console.error("Error adding analytics:", err);
    } finally {
      setSaving(false);
    }
  };

  // Time trends data
  const timeTrendsData = analyticsData
    .reduce((acc: any[], item) => {
      const existing = acc.find((d) => d.date === item.entry_date);
      if (existing) {
        existing.views += item.views;
        existing.likes += item.likes;
      } else {
        acc.push({ date: item.entry_date, views: item.views, likes: item.likes });
      }
      return acc;
    }, [])
    .slice(-30);

  // Pillar performance
  const pillarData = PILLARS.map((pillar) => {
    const items = analyticsData.filter((a) => a.pillar === pillar.id);
    const totalViews = items.reduce((sum, a) => sum + a.views, 0);
    const totalLikes = items.reduce((sum, a) => sum + a.likes, 0);
    return { name: pillar.label, views: totalViews, likes: totalLikes, fill: pillar.color };
  }).filter((p) => p.views > 0 || p.likes > 0);

  // Format performance
  const formatData = [
    { name: "Screen", value: analyticsData.filter((a) => a.format === "Screen Record").reduce((sum, a) => sum + a.likes, 0) },
    { name: "Text Cards", value: analyticsData.filter((a) => a.format === "Text Cards").reduce((sum, a) => sum + a.likes, 0) },
    { name: "Mixed", value: analyticsData.filter((a) => a.format === "Mixed").reduce((sum, a) => sum + a.likes, 0) },
  ].filter((f) => f.value > 0);

  // Hook effectiveness
  const hookData = analyticsData
    .reduce((acc: any[], item) => {
      const existing = acc.find((d) => d.hook === item.hook);
      if (existing) {
        existing.likes += item.likes;
        existing.views += item.views;
      } else {
        acc.push({ hook: item.hook.substring(0, 40) + "...", likes: item.likes, views: item.views });
      }
      return acc;
    }, [])
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  const formatColors = ["#f97316", "#22d3ee", "#34d399"];

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
          PERFORMANCE <span style={{ color: G.accent }}>ANALYTICS</span>
        </div>
        <div
          style={{
            color: G.muted,
            fontSize: 13,
            fontFamily: "'DM Mono',monospace",
            marginTop: 6,
          }}
        >
          Track views, likes, and performance by pillar
        </div>
      </div>

      {/* Log New Entry */}
      <div
        style={{
          background: G.surface,
          border: `1px solid ${G.border}`,
          borderRadius: 6,
          padding: 20,
          marginBottom: 20,
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
          Log Performance
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
          <select
            value={selectedScript}
            onChange={(e) => setSelectedScript(e.target.value)}
            style={{
              background: G.bg,
              border: `1px solid ${G.border}`,
              borderRadius: 4,
              color: G.text,
              padding: "8px 12px",
              fontFamily: "'DM Mono',monospace",
              fontSize: 12,
              flex: 1,
              minWidth: 200,
            }}
          >
            <option value="">Select a script...</option>
            {history.map((script) => (
              <option key={script.id} value={script.id}>
                {script.title.substring(0, 40)}...
              </option>
            ))}
          </select>
          <input
            type="date"
            value={newEntry.date}
            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
            style={{
              background: G.bg,
              border: `1px solid ${G.border}`,
              borderRadius: 4,
              color: G.text,
              padding: "8px 12px",
              fontFamily: "'DM Mono',monospace",
              fontSize: 12,
            }}
          />
          <input
            type="number"
            placeholder="Views"
            value={newEntry.views}
            onChange={(e) => setNewEntry({ ...newEntry, views: e.target.value })}
            style={{
              background: G.bg,
              border: `1px solid ${G.border}`,
              borderRadius: 4,
              color: G.text,
              padding: "8px 12px",
              fontFamily: "'DM Mono',monospace",
              fontSize: 12,
              width: 100,
            }}
          />
          <input
            type="number"
            placeholder="Likes"
            value={newEntry.likes}
            onChange={(e) => setNewEntry({ ...newEntry, likes: e.target.value })}
            style={{
              background: G.bg,
              border: `1px solid ${G.border}`,
              borderRadius: 4,
              color: G.text,
              padding: "8px 12px",
              fontFamily: "'DM Mono',monospace",
              fontSize: 12,
              width: 100,
            }}
          />
          <button
            onClick={addAnalyticsEntry}
            disabled={saving || !selectedScript || !newEntry.views || !newEntry.likes}
            style={{
              background: G.accent,
              border: "none",
              color: "#07080d",
              padding: "8px 16px",
              borderRadius: 4,
              fontFamily: "'DM Mono',monospace",
              fontSize: 12,
              cursor: "pointer",
              opacity: saving || !selectedScript || !newEntry.views || !newEntry.likes ? 0.5 : 1,
            }}
          >
            {saving ? "Saving..." : "Log Entry"}
          </button>
        </div>
      </div>

      {analyticsData.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: G.muted }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 13 }}>
            No analytics yet — log your first performance entry
          </div>
        </div>
      ) : (
        <>
          {/* Time Trends */}
          {timeTrendsData.length > 0 && (
            <div
              style={{
                background: G.surface,
                border: `1px solid ${G.border}`,
                borderRadius: 6,
                padding: 20,
                marginBottom: 20,
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
                Time Trends
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeTrendsData}>
                  <CartesianGrid stroke={G.border} />
                  <XAxis dataKey="date" stroke={G.muted} />
                  <YAxis stroke={G.muted} />
                  <Tooltip contentStyle={{ background: G.bg, border: `1px solid ${G.border}`, color: G.text }} />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#22d3ee" />
                  <Line type="monotone" dataKey="likes" stroke="#f97316" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Pillar Performance */}
          {pillarData.length > 0 && (
            <div
              style={{
                background: G.surface,
                border: `1px solid ${G.border}`,
                borderRadius: 6,
                padding: 20,
                marginBottom: 20,
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
                Pillar Performance
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pillarData}>
                  <CartesianGrid stroke={G.border} />
                  <XAxis dataKey="name" stroke={G.muted} />
                  <YAxis stroke={G.muted} />
                  <Tooltip contentStyle={{ background: G.bg, border: `1px solid ${G.border}`, color: G.text }} />
                  <Legend />
                  <Bar dataKey="views" fill="#22d3ee" />
                  <Bar dataKey="likes" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Format Performance */}
          {formatData.length > 0 && (
            <div
              style={{
                background: G.surface,
                border: `1px solid ${G.border}`,
                borderRadius: 6,
                padding: 20,
                marginBottom: 20,
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
                Format Performance (Engagement)
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={formatData} cx="50%" cy="50%" labelLine={false} label={{ fill: G.text }} outerRadius={80} fill="#8884d8" dataKey="value">
                    {formatData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={formatColors[index % formatColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: G.bg, border: `1px solid ${G.border}`, color: G.text }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Hook Effectiveness */}
          {hookData.length > 0 && (
            <div
              style={{
                background: G.surface,
                border: `1px solid ${G.border}`,
                borderRadius: 6,
                padding: 20,
                marginBottom: 20,
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
                Top Performing Hooks
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hookData}>
                  <CartesianGrid stroke={G.border} />
                  <XAxis dataKey="hook" stroke={G.muted} width={200} />
                  <YAxis stroke={G.muted} />
                  <Tooltip contentStyle={{ background: G.bg, border: `1px solid ${G.border}`, color: G.text }} />
                  <Bar dataKey="likes" fill={G.accent} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
}
