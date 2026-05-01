"use client";
import { useState } from "react";
import { toast } from "sonner";
import { CopyBtn } from "@/components/CopyBtn";

interface CommentReplyTabProps {
  G: any;
  user: any;
  supabase: any;
}

export default function CommentReplyTab({ G, user, supabase }: CommentReplyTabProps) {
  const [comment, setComment] = useState("");
  const [generatedReply, setGeneratedReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReply = async () => {
    if (!comment.trim()) {
      toast.error("Paste a comment to generate a reply");
      return;
    }
    
    setLoading(true);
    setError(null);
    setGeneratedReply(null);

    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setGeneratedReply(data.reply);
      toast.success("Reply generated!");

      // Optionally save to database
      await supabase.from("comment_replies").insert({
        user_id: user.id,
        original_comment: comment,
        generated_reply: data.reply,
      });
      
      toast.success("Reply saved to database!");
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to generate reply";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

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
          COMMENT <span style={{ color: G.accent }}>REPLY GENERATOR</span>
        </div>
        <div
          style={{
            color: G.muted,
            fontSize: 13,
            fontFamily: "'DM Mono',monospace",
            marginTop: 6,
          }}
        >
          Paste a TikTok comment and get an AI-generated educational reply
        </div>
      </div>

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
            marginBottom: 10,
          }}
        >
          Original Comment
        </div>
        <textarea
          rows={3}
          placeholder="Paste the TikTok comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            background: G.bg,
            border: `1.5px solid ${G.border}`,
            borderRadius: 4,
            color: G.text,
            fontFamily: "'DM Mono',monospace",
            fontSize: 13,
            padding: "12px 14px",
            width: "100%",
            outline: "none",
            transition: "border-color .2s",
            resize: "vertical",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = G.accent;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = G.border;
          }}
        />
        <div
          style={{
            fontSize: 11,
            color: G.dim,
            marginTop: 6,
            fontFamily: "'DM Mono',monospace",
          }}
        >
          Be specific for better replies
        </div>
      </div>

      <button
        disabled={!comment.trim() || loading}
        onClick={generateReply}
        style={{
          background: !comment.trim() || loading ? G.dim : G.accent,
          color: "#07080d",
          border: "none",
          padding: "14px 28px",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 15,
          fontWeight: 600,
          borderRadius: 4,
          cursor: !comment.trim() || loading ? "not-allowed" : "pointer",
          width: "100%",
          marginBottom: 20,
          opacity: !comment.trim() || loading ? 0.4 : 1,
        }}
      >
        {loading ? "⟳  Generating reply..." : "⬡  Generate Reply"}
      </button>

      {error && (
        <div
          style={{
            marginBottom: 20,
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

      {generatedReply && (
        <div className="fade-up">
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
                marginBottom: 10,
              }}
            >
              Your Reply (Educational & Helpful)
            </div>
            <div
              style={{
                background: G.bg,
                border: `1px solid ${G.border}`,
                borderRadius: 4,
                padding: 14,
                fontSize: 13,
                color: G.text,
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              {generatedReply}
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
              }}
            >
              <CopyBtn text={generatedReply} label="Copy Reply" G={G} />
              <button
                onClick={() => {
                  setComment("");
                  setGeneratedReply(null);
                }}
                style={{
                  background: "transparent",
                  border: `1px solid ${G.border}`,
                  color: G.muted,
                  padding: "5px 12px",
                  borderRadius: 3,
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 11,
                  cursor: "pointer",
                  transition: "all .15s",
                }}
              >
                Clear
              </button>
            </div>
          </div>

          <div
            style={{
              background: "#0a0c18",
              border: "1px solid #22d3ee20",
              borderRadius: 4,
              padding: "12px 16px",
              fontSize: 13,
              color: "#93c5fd",
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
              💡 ENGAGEMENT TIP
            </span>
            Replies that educate and add value get more engagement. Keep it 1-2 sentences, specific to their comment, and always helpful!
          </div>
        </div>
      )}
    </div>
  );
}
