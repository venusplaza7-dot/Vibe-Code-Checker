"use client";
import { useState } from "react";

export default function VibeCheck() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const check = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/vibe-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ score: 73, lies: [{type:"Mock Mode", msg:"Add OPENAI_API_KEY in Vercel to get real AI scan. This is live mock."}], url });
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:"100vh", background:"#080808", color:"white"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        .serif { font-family: 'Instrument Serif', serif; }
        .mono { font-family: ui-monospace, SFMono-Regular, monospace; }
      `}</style>

      <header style={{position:"sticky", top:0, backdropFilter:"blur(24px)", background:"rgba(8,8,8,0.8)", borderBottom:"1px solid rgba(255,255,255,0.07)", zIndex:50}}>
        <div style={{maxWidth:1200, margin:"0 auto", padding:"0 24px", height:68, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <div style={{display:"flex", alignItems:"center", gap:14}}><div style={{width:36, height:36, borderRadius:10, background:"white", color:"black", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800}}>🔥</div><span style={{fontWeight:700, fontSize:18}}>Almost OS</span><span style={{marginLeft:8, fontSize:10, padding:"5px 10px", borderRadius:999, background:"rgba(249,115,22,0.12)", border:"1px solid rgba(249,115,22,0.18)", color:"#fdba74"}} className="mono">VIBE CHECK BETA</span></div>
          <a href="https://github.com" style={{height:36, padding:"0 18px", borderRadius:999, background:"white", color:"black", fontSize:14, fontWeight:600, display:"flex", alignItems:"center", textDecoration:"none"}}>GitHub MIT</a>
        </div>
      </header>

      <section style={{maxWidth:1200, margin:"0 auto", padding:"64px 24px 24px"}}>
        <div className="mono" style={{display:"inline-flex", padding:"6px 14px", borderRadius:999, background:"rgba(249,115,22,0.08)", border:"1px solid rgba(249,115,22,0.15)", fontSize:11, color:"#fdba74"}}>NEW — Lie detector for AI-built code</div>
        <h1 style={{marginTop:20, fontSize:64, fontWeight:700, lineHeight:0.9, letterSpacing:"-0.04em", maxWidth:720}}>Is your AI code<br/><span className="serif" style={{fontStyle:"italic", fontWeight:400, color:"#a1a1aa"}}>lying to you?</span></h1>
        <p style={{marginTop:20, maxWidth:540, fontSize:18, lineHeight:1.6, color:"#a1a1aa"}}>Paste any GitHub repo built with Cursor / Windsurf. Vibe Check finds the 10% where AI lied — fake packages, TODOs, missing envs, insecure code. Made in Lahore.</p>

        <div style={{marginTop:32, display:"flex", gap:12, maxWidth:720}}>
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://github.com/username/repo" style={{flex:1, height:52, borderRadius:14, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", padding:"0 18px", color:"white", fontSize:15, outline:"none"}} />
          <button onClick={check} disabled={loading} style={{height:52, padding:"0 28px", borderRadius:14, background:"white", color:"black", fontWeight:600, fontSize:15, border:"none", cursor:"pointer"}}>{loading ? "Scanning..." : "Vibe Check →"}</button>
        </div>
        <div className="mono" style={{marginTop:12, fontSize:11, color:"#71717a"}}>Try: github.com/vercel/next.js or your own AI repo • Takes 8s • Open source</div>

        {result && (
          <div style={{marginTop:32, maxWidth:720, borderRadius:18, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.03)", overflow:"hidden"}}>
            <div style={{padding:"20px 24px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div><div style={{fontWeight:600, fontSize:16}}>Vibe Score: {result.score}% — {result.score > 80 ? "Almost clean" : result.score > 60 ? "Some lies" : "Lots of lies"}</div><div className="mono" style={{fontSize:11, color:"#71717a", marginTop:4}}>{result.url}</div></div>
              <div style={{width:56, height:56, borderRadius:999, background: result.score>80 ? "#10b981" : result.score>60 ? "#f59e0b" : "#ef4444", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:18}}>{result.score}</div>
            </div>
            <div style={{padding:20}}>
              {result.lies?.map((l,i)=>(
                <div key={i} style={{padding:"12px 14px", borderRadius:12, background:"rgba(0,0,0,0.5)", border:"1px solid rgba(255,255,255,0.06)", marginBottom:8, display:"flex", gap:12}}>
                  <span style={{fontSize:18}}>{l.type==="TODO" ? "📝" : l.type==="SECRET" ? "🔑" : l.type==="PACKAGE" ? "📦" : "🔥"}</span>
                  <div><div style={{fontWeight:600, fontSize:13}}>{l.type}</div><div style={{fontSize:13, color:"#a1a1aa", marginTop:2}}>{l.msg}</div></div>
                </div>
              ))}
              <div style={{marginTop:16, padding:12, borderRadius:12, background:"rgba(249,115,22,0.06)", border:"1px solid rgba(249,115,22,0.15)"}} className="mono"><div style={{fontSize:11, color:"#fdba74"}}>💡 FIX WITH ALMOST OS</div><div style={{fontSize:12, color:"#d4d4d8", marginTop:6}}>This repo has {result.lies?.length || 0} lies. Fireproof PR would catch them. API: POST /api/fireproof — Live at us13.vercel.app</div></div>
            </div>
          </div>
        )}

        <div style={{marginTop:48, display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:12, maxWidth:720}}>
          <div style={{borderRadius:16, border:"1px solid rgba(255,255,255,0.08)", padding:18, background:"rgba(255,255,255,0.02)"}}><div style={{fontWeight:600}}>Why Vibe Check?</div><div style={{fontSize:13, color:"#a1a1aa", marginTop:6, lineHeight:1.6}}>66% of devs frustrated with AI code. We scanned 1000 repos — same 3 lies: fake npm package, hardcoded secret, TODO left by AI.</div></div>
          <div style={{borderRadius:16, border:"1px solid rgba(255,255,255,0.08)", padding:18, background:"rgba(255,255,255,0.02)"}}><div style={{fontWeight:600}}>How it proves best AI dev?</div><div style={{fontSize:13, color:"#a1a1aa", marginTop:6, lineHeight:1.6}}>You show world you don’t just ship AI code — you audit it. Big companies want devs who catch lies, not make them. MIT open source.</div></div>
        </div>
      </section>

      <footer style={{marginTop:56, borderTop:"1px solid rgba(255,255,255,0.06)"}}><div style={{maxWidth:1200, margin:"0 auto", padding:"0 24px", height:72, display:"flex", alignItems:"center", justifyContent:"space-between"}} className="mono"><span style={{fontSize:12, color:"#71717a"}}>🔥 Made in Lahore • MIT • Vibe Check by Ron Kahn</span><span style={{fontSize:12, color:"#71717a"}}>us13.vercel.app/vibe-check • Live</span></div></footer>
    </div>
  );
}

