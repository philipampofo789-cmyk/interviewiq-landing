"use client";
import { useState, useEffect } from "react";

const QUESTIONS = [
  "Tell me about a time you failed and what you learned from it.",
  "Why should we hire you over other candidates?",
  "Describe a situation where you influenced without direct authority.",
  "Walk me through a difficult decision you had to make under pressure.",
];

export default function InterviewIQLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [count, setCount] = useState(312);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const q = QUESTIONS[qIndex];
    let t;
    if (!deleting && displayText.length < q.length) {
      t = setTimeout(() => setDisplayText(q.slice(0, displayText.length + 1)), 38);
    } else if (!deleting && displayText.length === q.length) {
      t = setTimeout(() => { setShowScore(true); }, 400);
      const t2 = setTimeout(() => { setShowScore(false); setDeleting(true); }, 3200);
      return () => { clearTimeout(t); clearTimeout(t2); };
    } else if (deleting && displayText.length > 0) {
      t = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 18);
    } else if (deleting && displayText.length === 0) {
      setDeleting(false);
      setQIndex((p) => (p + 1) % QUESTIONS.length);
    }
    return () => clearTimeout(t);
  }, [displayText, deleting, qIndex]);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/xrewleby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    } catch (_) {}
    setSubmitted(true);
    setCount((p) => p + 1);
    setLoading(false);
  };

  const scores = [
    { label: "Answer Structure (STAR)", val: 74 },
    { label: "Delivery & Pacing",       val: 61 },
    { label: "Specificity & Numbers",   val: 88 },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", background: "#0B0E19", minHeight: "100vh", color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px);} to { opacity:1; transform:translateY(0);} }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scoreIn{ from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.55s ease forwards; }
        .cursor  { display:inline-block; width:2px; height:1em; background:#F5A524; vertical-align:middle; margin-left:2px; animation:blink 0.95s infinite; }
        .score-in{ animation: scoreIn 0.4s ease forwards; }
        .bar-bg  { height:5px; border-radius:3px; background:#1A1F38; overflow:hidden; }
        .bar-fill{ height:100%; border-radius:3px; background:linear-gradient(90deg,#F5A524,#FFD080); transition:width 0.8s ease; }
        .pill    { display:inline-flex; align-items:center; gap:6px; background:#1A1F38; border:1px solid #252C4A; border-radius:20px; padding:5px 12px; font-size:12px; font-weight:600; color:#F5A524; letter-spacing:0.06em; }
        .card    { background:#101425; border:1px solid #1A1F38; border-radius:18px; padding:20px; }
        .feat:hover { transform:translateY(-2px); transition:transform 0.2s ease; }
      `}</style>

      {/* ── Nav ── */}
      <nav style={{ maxWidth:480, margin:"0 auto", padding:"20px 22px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:34, height:34, background:"#F5A524", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:13, color:"#0B0E19" }}>IQ</div>
          <span style={{ fontWeight:800, fontSize:16, letterSpacing:"-0.03em" }}>InterviewIQ</span>
        </div>
        <span className="pill">COMING SOON</span>
      </nav>

      <main style={{ maxWidth:480, margin:"0 auto", padding:"8px 22px 56px" }}>

        {/* ── AI Interviewer Card ── */}
        <div className="card fade-up" style={{ marginBottom:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:12 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#F5A524" }} />
            <span style={{ fontSize:11, fontWeight:700, color:"#6B748A", letterSpacing:"0.09em", textTransform:"uppercase" }}>AI Interviewer</span>
          </div>
          <p style={{ fontSize:17, fontWeight:500, lineHeight:1.52, color:"#E8ECFF", minHeight:80 }}>
            "{displayText}<span className="cursor" />
          </p>
        </div>

        {/* ── Score Card (appears after question completes) ── */}
        <div className="card score-in" style={{
          marginBottom:36,
          opacity: showScore ? 1 : 0,
          pointerEvents: showScore ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:14 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#4ADE80" }} />
            <span style={{ fontSize:11, fontWeight:700, color:"#6B748A", letterSpacing:"0.09em", textTransform:"uppercase" }}>Your Feedback</span>
          </div>
          {scores.map((s) => (
            <div key={s.label} style={{ marginBottom:11 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <span style={{ fontSize:13, color:"#A8B0CC", fontWeight:500 }}>{s.label}</span>
                <span style={{ fontSize:13, fontWeight:700, color:"#F5A524" }}>{s.val}%</span>
              </div>
              <div className="bar-bg"><div className="bar-fill" style={{ width:`${showScore ? s.val : 0}%` }} /></div>
            </div>
          ))}
          <div style={{ marginTop:14, background:"#0B0E19", borderRadius:10, padding:"12px 14px", fontSize:13, color:"#A8B0CC", lineHeight:1.55 }}>
            💡 <span style={{ color:"#E8ECFF" }}>Strong result — but no metric cited. Add a number ("reduced churn by 18%") to double hiring manager impact.</span>
          </div>
        </div>

        {/* ── Headline ── */}
        <div style={{ marginBottom:36 }}>
          <h1 style={{ fontSize:38, fontWeight:800, lineHeight:1.08, letterSpacing:"-0.035em", marginBottom:16 }}>
            The interview coach that tells you{" "}
            <span style={{ color:"#F5A524" }}>what to say</span>{" "}
            and{" "}
            <span style={{ WebkitTextStroke:"1.5px #F5A524", color:"transparent" }}>how to say it.</span>
          </h1>
          <p style={{ fontSize:16, color:"#6B748A", lineHeight:1.65, fontWeight:400 }}>
            AI-powered mock interviews with dual feedback on both your <strong style={{ color:"#A8B0CC" }}>answer content</strong> and <strong style={{ color:"#A8B0CC" }}>delivery</strong>. Unlimited practice. One flat price. No billing surprises.
          </p>
        </div>

        {/* ── Email Form ── */}
        {!submitted ? (
          <div style={{ marginBottom:44 }}>
            <div className="card" style={{ border:"1px solid #252C4A" }}>
              <p style={{ fontSize:13, fontWeight:700, color:"#F5A524", marginBottom:4, letterSpacing:"0.02em" }}>🔥 Join the waitlist</p>
              <p style={{ fontSize:21, fontWeight:800, marginBottom:20, letterSpacing:"-0.025em", lineHeight:1.2 }}>
                Get early access +<br />30 days free Pro
              </p>

              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                style={{
                  width:"100%", background:"#0B0E19",
                  border: error ? "1.5px solid #EF4444" : "1.5px solid #1A1F38",
                  borderRadius:12, padding:"14px 16px", fontSize:16,
                  color:"#fff", outline:"none", marginBottom:10,
                  fontFamily:"inherit", transition:"border-color 0.2s",
                }}
              />
              {error && <p style={{ fontSize:13, color:"#EF4444", marginBottom:10 }}>{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width:"100%", background: loading ? "#8B6A14" : "#F5A524",
                  color:"#0B0E19", border:"none", borderRadius:12,
                  padding:"15px", fontSize:16, fontWeight:800,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily:"inherit", letterSpacing:"-0.01em",
                  transition:"background 0.2s, transform 0.1s",
                }}
              >
                {loading ? "Joining..." : "Get Early Access →"}
              </button>

              <p style={{ fontSize:12, color:"#404860", marginTop:12, textAlign:"center" }}>
                No spam. Unsubscribe anytime. We'll only email you at launch.
              </p>
            </div>

            {/* Waitlist counter */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:9, marginTop:16 }}>
              <div style={{ display:"flex" }}>
                {["#4ADE80","#F5A524","#60A5FA","#F472B6","#A78BFA"].map((c,i)=>(
                  <div key={i} style={{
                    width:26, height:26, borderRadius:"50%", background:c,
                    marginLeft: i > 0 ? -9 : 0, border:"2px solid #0B0E19",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:10, fontWeight:800, color:"#0B0E19",
                  }}>{String.fromCharCode(65+i)}</div>
                ))}
              </div>
              <span style={{ fontSize:13, color:"#6B748A" }}>
                <span style={{ color:"#fff", fontWeight:700 }}>{count.toLocaleString()}</span> job seekers already waiting
              </span>
            </div>
          </div>
        ) : (
          <div style={{ background:"#0B1F18", border:"1px solid #153D2E", borderRadius:18, padding:"32px 24px", textAlign:"center", marginBottom:44 }}>
            <div style={{ fontSize:44, marginBottom:12 }}>🎉</div>
            <p style={{ fontSize:22, fontWeight:800, marginBottom:8, letterSpacing:"-0.02em" }}>You're on the list!</p>
            <p style={{ fontSize:15, color:"#6B748A", lineHeight:1.6 }}>
              We'll reach out the moment InterviewIQ launches — with your 30 days free Pro included.
            </p>
          </div>
        )}

        {/* ── Feature Cards ── */}
        <p style={{ fontSize:11, fontWeight:700, color:"#404860", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>
          Why InterviewIQ is different
        </p>
        {[
          { icon:"🎯", title:"Content AND delivery feedback", body:"Most tools coach how you speak. We also score what you say — STAR structure, specificity, relevance, and your closing line. Because a smooth delivery of a weak answer still loses you the job." },
          { icon:"♾️", title:"Unlimited practice. One price.", body:"No credits. No session caps. No surprise renewals. Practice until the night before your interview — not until your plan runs out." },
          { icon:"📱", title:"Built for your phone", body:"Practice on your commute, your lunch break, or five minutes before bed. InterviewIQ is mobile-first from the ground up — not a desktop app shrunk to fit." },
        ].map((f) => (
          <div key={f.title} className="card feat" style={{ marginBottom:10, display:"flex", gap:16, alignItems:"flex-start" }}>
            <div style={{ fontSize:22, flexShrink:0, marginTop:2 }}>{f.icon}</div>
            <div>
              <p style={{ fontWeight:700, fontSize:15, marginBottom:6, letterSpacing:"-0.01em" }}>{f.title}</p>
              <p style={{ fontSize:13, color:"#6B748A", lineHeight:1.6 }}>{f.body}</p>
            </div>
          </div>
        ))}

        {/* ── Footer ── */}
        <div style={{ textAlign:"center", marginTop:44 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:8 }}>
            <div style={{ width:26, height:26, background:"#F5A524", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:11, color:"#0B0E19" }}>IQ</div>
            <span style={{ fontWeight:800, fontSize:14, letterSpacing:"-0.02em" }}>InterviewIQ</span>
          </div>
          <p style={{ fontSize:12, color:"#2A2F4A" }}>© 2026 InterviewIQ · All rights reserved.</p>
        </div>
      </main>
    </div>
  );
}
