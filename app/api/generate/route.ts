import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a TikTok content strategist for Web3/developer creators. The creator is building "OnChainArt" (OCA), a fully on-chain generative SVG NFT collection using Scaffold-ETH 2 and Foundry. They post screen recordings and text card videos — no face cam. 30k followers.

Return ONLY a raw JSON object. No markdown, no backticks, no preamble:
{
  "title": "catchy video title",
  "hook": "first 2-second hook — shocking or provocative, max 12 words",
  "hook_b": "alternate hook option B",
  "hook_c": "alternate hook option C",
  "format_notes": "one production tip",
  "script": [
    { "type": "voiceover|textcard|action", "content": "text", "duration": "Xs" }
  ],
  "captions": ["line1", "line2"],
  "hashtags": ["tag1","tag2","tag3","tag4","tag5"],
  "cta": "end call to action",
  "capcut_tip": "one CapCut editing tip",
  "repurpose_tweet": "Twitter/X thread opener for this video",
  "repurpose_linkedin": "LinkedIn post version (2-3 sentences)"
}
Keep video 30-60 seconds. Make it specific to Web3, Solidity, NFTs, OnChainArt, Foundry, or Scaffold-ETH when relevant.`;

export async function POST(req: NextRequest) {
  try {
    const { pillar, format, topic, seriesDay } = await req.json();
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1200,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: `Pillar: ${pillar}\nFormat: ${format}\nTopic: ${topic}\nSeries day: ${seriesDay}` }],
      }),
    });
    const data = await response.json();
    const raw = data.content.map((i: any) => i.text || "").join("");
    const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
    return NextResponse.json(parsed);
  } catch (e) {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
