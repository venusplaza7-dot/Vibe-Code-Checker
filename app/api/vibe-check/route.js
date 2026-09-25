import { NextResponse } from "next/server";

export async function POST(req) {
  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "Need GitHub URL" }, { status: 400 });

  // Mock smart scan - replace with real GitHub fetch + OpenAI later
  // Real logic would fetch repo files and check for lies
  const repo = url.split("github.com/")[1] || url;
  
  const lies = [];
  
  // Simulate common AI lies
  if (repo.includes("next") || Math.random() > 0.3) {
    lies.push({ type: "TODO", msg: "Found 3 TODOs left by AI — // TODO: handle edge case in api/route.ts:42" });
  }
  if (Math.random() > 0.5) {
    lies.push({ type: "SECRET", msg: "Possible hardcoded secret in .env.example — NEXT_PUBLIC_SUPABASE_ANON_KEY exposed" });
  }
  if (Math.random() > 0.4) {
    lies.push({ type: "PACKAGE", msg: "Package 'react-fireproof' may not exist — AI hallucinated import in components/Fireproof.tsx" });
  }
  if (Math.random() > 0.6) {
    lies.push({ type: "SECURITY", msg: "Insecure eval() found — AI used eval(userInput) in lib/utils.ts, XSS risk" });
  }
  if (lies.length === 0) {
    lies.push({ type: "CLEAN", msg: "No obvious lies found in quick scan. Run full Fireproof PR for deep scan via /api/fireproof" });
  }

  const score = Math.max(20, 100 - lies.length * 15 - Math.floor(Math.random() * 20));

  // TODO: Add real Supabase logging here
  // await supabase.from('vibe_checks').insert({ url, score, lies })

  return NextResponse.json({
    url,
    repo,
    score,
    lies,
    scannedAt: new Date().toISOString(),
    message: "Mock scan — add OPENAI_API_KEY + GITHUB_TOKEN in Vercel for real AI scan",
    fix: "Use POST /api/fireproof with diff to auto-fix these",
    live: true
  });
}

export async function GET() {
  return NextResponse.json({ 
    status: "Vibe Check API LIVE", 
    usage: "POST { url: 'https://github.com/username/repo' }",
    example: "curl -X POST https://us13.vercel.app/api/vibe-check -H 'Content-Type: application/json' -d '{\"url\":\"https://github.com/vercel/next.js\"}'",
    live: true 
  });
}

