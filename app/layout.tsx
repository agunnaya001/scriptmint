import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ScriptMint — Daily TikTok Scripts for Web3 Builders",
  description: "AI-powered TikTok content generator for Web3 developers and creators.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#07080d" }}>{children}</body>
    </html>
  );
}
