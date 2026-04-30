"use client";
import { useState, useRef, useEffect } from "react";

const PILLAR_COLORS: Record<string, { bg: string; accent: string }> = {
  build: { bg: "#130f08", accent: "#f97316" },
  edu: { bg: "#0a0f1a", accent: "#22d3ee" },
  money: { bg: "#110a1a", accent: "#a78bfa" },
  bts: { bg: "#0a1812", accent: "#34d399" },
};

interface ThumbnailPreviewProps {
  G: any;
  hook: string;
  pillar: string;
}

export function ThumbnailPreview({ G, hook, pillar }: ThumbnailPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    generateThumbnail();
  }, [hook, pillar]);

  const generateThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    const colors = PILLAR_COLORS[pillar] || PILLAR_COLORS.build;

    // Background
    ctx.fillStyle = "#07080d";
    ctx.fillRect(0, 0, width, height);

    // Accent stripe (top)
    ctx.fillStyle = colors.accent;
    ctx.fillRect(0, 0, width, 60);

    // Main content area with gradient background
    const gradient = ctx.createLinearGradient(0, 60, 0, height);
    gradient.addColorStop(0, colors.bg);
    gradient.addColorStop(1, "#0a0b14");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 60, width, height - 60);

    // Outer border
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, width, height);

    // Draw hook text
    ctx.font = "bold 72px 'Bebas Neue', sans-serif";
    ctx.fillStyle = colors.accent;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Word wrap for text
    const words = hook.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > width - 80) {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) lines.push(currentLine);

    const lineHeight = 100;
    const totalHeight = lines.length * lineHeight;
    const startY = (height - totalHeight) / 2;

    // Add subtle text shadow
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.font = "bold 72px 'Bebas Neue', sans-serif";
    lines.forEach((line, i) => {
      ctx.fillText(line, width / 2 + 3, startY + i * lineHeight + 3);
    });

    // Draw main text
    ctx.fillStyle = G.white || "#ffffff";
    ctx.font = "bold 72px 'Bebas Neue', sans-serif";
    lines.forEach((line, i) => {
      ctx.fillText(line, width / 2, startY + i * lineHeight);
    });

    // Draw accent highlight under text
    ctx.fillStyle = colors.accent;
    ctx.fillRect(width / 2 - 200, startY + lines.length * lineHeight + 20, 400, 8);

    // ScriptMint watermark
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "bold 32px 'DM Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("SCRIPTMINT", width / 2, height - 100);

    // Convert to image
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setImage(url);
      }
    });
  };

  return (
    <div
      style={{
        background: G.surface,
        border: `1px solid ${G.border}`,
        borderRadius: 6,
        padding: 20,
        marginBottom: 16,
        textAlign: "center",
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
        TikTok Cover Preview
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {image && (
        <img
          src={image}
          alt="TikTok thumbnail"
          style={{
            width: "100%",
            maxWidth: 300,
            height: "auto",
            borderRadius: 4,
            border: `1px solid ${G.border}`,
          }}
        />
      )}
      <div
        style={{
          fontSize: 11,
          color: G.muted,
          marginTop: 12,
          fontStyle: "italic",
          fontFamily: "'DM Mono',monospace",
        }}
      >
        Auto-generated 1080×1920px cover
      </div>
    </div>
  );
}
