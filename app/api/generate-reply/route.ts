import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { comment } = await req.json();

    if (!comment) {
      return NextResponse.json({ error: "Comment is required" }, { status: 400 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 200,
        system: `You are a helpful Web3/Solidity expert replying to TikTok comments on developer content. 
Generate a short, educational, and engaging reply (1-2 sentences max) that:
1. Directly addresses the comment
2. Adds genuine value or insight
3. Encourages further engagement
4. Is casual and authentic (TikTok style, not corporate)

Reply ONLY with the text, no explanations.`,
        messages: [{ role: "user", content: `TikTok comment to reply to: "${comment}"` }],
      }),
    });

    const data = await response.json();
    const reply = data.content.map((i: any) => i.text || "").join("").trim();

    return NextResponse.json({ reply });
  } catch (e) {
    console.error("Error generating reply:", e);
    return NextResponse.json({ error: "Reply generation failed" }, { status: 500 });
  }
}
