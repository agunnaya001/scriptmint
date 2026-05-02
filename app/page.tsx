"use client";
import { useState, useEffect, useCallback } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Toaster, toast } from "sonner";
import { useSupabase } from "@/lib/supabase-client";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { BaseStatus } from "@/hooks/useBaseIntegration";
import GenerateTab from "@/components/tabs/GenerateTab";
import CalendarTab from "@/components/tabs/CalendarTab";
import HistoryTab from "@/components/tabs/HistoryTab";
import HookLibraryTab from "@/components/tabs/HookLibraryTab";
import AnalyticsTab from "@/components/tabs/AnalyticsTab";
import CommentReplyTab from "@/components/tabs/CommentReplyTab";

const G = {
  bg: "#07080d",
  surface: "#0d0e16",
  border: "#1c1d2e",
  accent: "#f97316",
  dim: "#3a3b52",
  muted: "#6b6c85",
  text: "#e2e3f0",
  white: "#ffffff",
};

export default function ScriptMint() {
  const { user, isLoaded } = useUser();
  const { redirectToSignIn, signOut: clerkSignOut } = useClerk();
  const supabase = useSupabase();
  const [view, setView] = useState("generate");
  const [history, setHistory] = useState<any[]>([]);
  const [seriesDay, setSeriesDay] = useState(1);

  const signOut = useCallback(async () => {
    await clerkSignOut({ redirectUrl: "/" });
  }, [clerkSignOut]);

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !user) {
      redirectToSignIn();
    }
  }, [user, isLoaded, redirectToSignIn]);

  // Load history from Supabase
  useEffect(() => {
    if (user) {
      loadHistory();
      loadSeriesDay();
    }
  }, [user]);

  const loadHistory = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("scripts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(30);

      if (error) throw error;
      setHistory(data || []);
    } catch (err) {
      console.error("Error loading history:", err);
      toast.error("Failed to load script history");
    }
  };

  const loadSeriesDay = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("scripts")
        .select("series_day")
        .eq("user_id", user.id)
        .order("series_day", { ascending: false })
        .limit(1);

      if (error) throw error;
      if (data && data.length > 0) {
        setSeriesDay(data[0].series_day + 1);
      }
    } catch (err) {
      console.error("Error loading series day:", err);
    }
  };

  const navStyle = (id: string) => ({
    background: "none",
    border: "none",
    fontFamily: "'DM Mono',monospace",
    fontSize: 12,
    letterSpacing: ".08em",
    color: view === id ? G.accent : G.muted,
    cursor: "pointer",
    padding: "8px 14px",
    borderRadius: 3,
    transition: "all .15s",
    textTransform: "uppercase" as const,
    backgroundColor: view === id ? "#f9731610" : "transparent",
  });

  if (!isLoaded || !user) {
    return (
      <div style={{ minHeight: "100vh", background: G.bg, color: G.text, fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div className="spin" style={{ width: 28, height: 28, border: `2px solid ${G.border}`, borderTopColor: G.accent, borderRadius: "50%", margin: "0 auto 14px" }} />
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: ".1em" }}>LOADING...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: G.bg, color: G.text, fontFamily: "'DM Sans',sans-serif" }}>
      <Toaster position="bottom-right" theme="dark" richColors />
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
          {[
            ["generate", "Generate"],
            ["calendar", "Calendar"],
            ["history", "History"],
            ["hooks", "Hook Library"],
            ["analytics", "Analytics"],
            ["replies", "Comments"],
          ].map(([id, label]) => (
            <button key={id} style={navStyle(id)} onClick={() => setView(id)}>
              {label}
            </button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <BaseStatus />
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: G.muted }}>
            Day <span style={{ color: G.accent }}>{seriesDay}</span>
          </div>
          <div style={{ width: 1, height: 24, background: G.border }} />
          <div style={{ width: 120 }}>
            <WalletConnectButton />
          </div>
          <button
            onClick={() => {
              signOut();
            }}
            style={{
              background: "transparent",
              border: `1px solid ${G.border}`,
              color: G.muted,
              padding: "6px 12px",
              borderRadius: 4,
              fontSize: 11,
              cursor: "pointer",
              fontFamily: "'DM Mono',monospace",
              transition: "all .2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = G.accent;
              (e.target as HTMLElement).style.color = G.text;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = G.border;
              (e.target as HTMLElement).style.color = G.muted;
            }}
          >
            SIGN OUT
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 780, margin: "0 auto", padding: "32px 20px" }}>
        {view === "generate" && <GenerateTab G={G} user={user} supabase={supabase} seriesDay={seriesDay} onGenerated={loadHistory} />}
        {view === "calendar" && <CalendarTab G={G} seriesDay={seriesDay} setView={setView} />}
        {view === "history" && <HistoryTab G={G} history={history} setView={setView} />}
        {view === "hooks" && <HookLibraryTab G={G} setView={setView} />}
        {view === "analytics" && <AnalyticsTab G={G} user={user} supabase={supabase} history={history} />}
        {view === "replies" && <CommentReplyTab G={G} user={user} supabase={supabase} />}
      </main>
    </div>
  );
}
