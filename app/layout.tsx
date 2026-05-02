import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "ScriptMint — Daily TikTok Scripts for Web3 Builders",
  description: "AI-powered TikTok content generator for Web3 developers and creators.",
  other: {
    "base:app_id": "69f58033ae7f270edcba4e22",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body style={{ margin: 0, padding: 0, background: "#07080d" }}>
            {children}
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
