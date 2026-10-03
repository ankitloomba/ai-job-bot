"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { LoginForm } from "@/components/auth/login-form";
import { Loader2 } from "lucide-react";

const slides = [
  {
    badge: "All your job boards, one place",
    headline: ["One feed.", "Every job."],
    accentLine: 0,
    accentWords: ["One", "feed."],
    body: "Connect LinkedIn, Naukri, Glassdoor and more. We pull every listing into one ranked feed — duplicates removed.",
    visual: "logos" as const,
    logos: [
      { label: "in", bg: "#0A66C2", title: "LinkedIn" },
      { label: "N",  bg: "#0057D9", title: "Naukri" },
      { label: "G",  bg: "#34A853", title: "Glassdoor" },
      { label: "M",  bg: "#6D28D9", title: "Monster" },
      { label: "i",  bg: "#374151", title: "Indeed" },
    ],
  },
  {
    badge: "AI match scores",
    headline: ["Every role,", "scored for you."],
    accentLine: 1,
    accentWords: ["scored", "for", "you."],
    body: "Our AI reads your resume and scores every job for fit — so you always apply where you have the best shot.",
    visual: "jobs" as const,
    jobs: [
      { score: 94, title: "Senior Frontend Engineer", sub: "Stripe · Remote · $150–200k", color: "#16A34A" },
      { score: 87, title: "Staff Engineer",            sub: "Linear · San Francisco",      color: "#16A34A" },
      { score: 74, title: "Senior Software Engineer",  sub: "Figma · missing WebGL",       color: "#CA8A04" },
    ],
  },
  {
    badge: "Auto-apply coming soon",
    headline: ["Your AI job search,", "on autopilot."],
    accentLine: 1,
    accentWords: ["on", "autopilot."],
    body: "Match to 50k+ roles across every major portal. JobHuntPro works while you sleep.",
    visual: "stats" as const,
    stats: [
      { value: "94%",    label: "Avg. match score" },
      { value: "50k+",   label: "Jobs indexed" },
      { value: "11 days", label: "Avg. time to hire" },
    ],
  },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center shadow-sm flex-shrink-0">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7"/>
          <line x1="16.5" y1="16.5" x2="21" y2="21"/>
          <circle cx="11" cy="11" r="2.5" fill="currentColor" strokeWidth="0" opacity="0.55"/>
        </svg>
      </div>
      <span className="font-extrabold text-xl tracking-tight text-jhp-black">JobHuntPro</span>
    </div>
  );
}

export default function LoginPage() {
  const [slide, setSlide] = useState(0);
  const [tab, setTab] = useState<"create" | "signin">("create");
  const [oauthLoading, setOauthLoading] = useState<"google" | "linkedin" | null>(null);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const s = slides[slide];

  const handleGoogle = async () => {
    setOauthLoading("google");
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleLinkedIn = async () => {
    setOauthLoading("linkedin");
    await signIn("linkedin", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex">

      {/* ══════════ LEFT — hero carousel ══════════ */}
      <div
        className="hidden lg:flex flex-col justify-between flex-1 p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(140deg,#dbeafe 0%,#ede9fe 40%,#fce7f3 75%,#f0f9ff 100%)" }}
      >
        {/* grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(0,0,0,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.035) 1px,transparent 1px)", backgroundSize:"44px 44px" }}
        />

        {/* top logo */}
        <div className="relative z-10"><Logo /></div>

        {/* slide */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[480px] py-12">

          {/* badge */}
          <div className="inline-flex items-center gap-2 bg-white/75 backdrop-blur-sm border border-white/60 rounded-full px-3.5 py-1.5 mb-8 w-fit shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[13px] font-semibold text-jhp-black">{s.badge}</span>
          </div>

          {/* headline */}
          <h1 className="text-[52px] font-black leading-[1.02] tracking-tight text-jhp-black mb-5">
            {s.headline.map((line, i) => (
              <span key={i} className="block">
                {i === s.accentLine
                  ? line.split(" ").map((w, wi, arr) => (
                      <span key={wi}
                        className={s.accentWords.includes(w)
                          ? "bg-gradient-to-r from-brand via-violet-500 to-pink-500 bg-clip-text text-transparent"
                          : ""}
                      >{w}{wi < arr.length - 1 ? " " : ""}</span>
                    ))
                  : line}
              </span>
            ))}
          </h1>

          <p className="text-jhp-gray text-[17px] leading-relaxed mb-10">{s.body}</p>

          {/* visual */}
          {s.visual === "logos" && (
            <div className="flex items-center gap-3 flex-wrap">
              {s.logos!.map((l, i) => (
                <div key={i} title={l.title}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-md"
                  style={{ background: l.bg }}>{l.label}</div>
              ))}
              <span className="text-jhp-gray text-sm ml-1 font-medium">+ more coming</span>
            </div>
          )}

          {s.visual === "jobs" && (
            <div className="flex flex-col gap-2.5">
              {s.jobs!.map((job, i) => (
                <div key={i}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-4 border border-white/70 shadow-sm">
                  <span className="text-2xl font-black w-10 text-right flex-shrink-0" style={{ color: job.color }}>{job.score}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-jhp-black text-[13px] truncate">{job.title}</div>
                    <div className="text-jhp-gray text-xs">{job.sub}</div>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{ background:`${job.color}18`, color: job.color }}>{job.score}% fit</span>
                </div>
              ))}
            </div>
          )}

          {s.visual === "stats" && (
            <div className="flex gap-8">
              {s.stats!.map((st, i) => (
                <div key={i}>
                  <div className="text-4xl font-black text-jhp-black tracking-tight">{st.value}</div>
                  <div className="text-jhp-gray text-sm mt-0.5">{st.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* dots */}
        <div className="relative z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`rounded-full transition-all duration-300 ${i === slide ? "w-7 h-2 bg-brand" : "w-2 h-2 bg-jhp-gray/35 hover:bg-jhp-gray/60"}`}
            />
          ))}
        </div>
      </div>

      {/* ══════════ RIGHT — auth card ══════════ */}
      <div className="flex-1 lg:max-w-[420px] flex items-center justify-center bg-jhp-cream px-6 py-12">
        <div className="w-full max-w-[360px]">

          {/* mobile logo */}
          <div className="lg:hidden flex justify-center mb-8"><Logo /></div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-7">

            {/* tab */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6 gap-1">
              {(["create", "signin"] as const).map(t2 => (
                <button key={t2} onClick={() => setTab(t2)}
                  className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-all ${tab === t2 ? "bg-white text-jhp-black shadow-sm" : "text-jhp-gray hover:text-jhp-black"}`}>
                  {t2 === "create" ? "Create account" : "Sign in"}
                </button>
              ))}
            </div>

            {/* heading */}
            <h2 className="text-lg font-bold text-jhp-black mb-1">
              {tab === "create" ? "Create your free account" : "Welcome back"}
            </h2>
            <p className="text-sm text-jhp-gray mb-5">
              {tab === "create" ? "Start matching jobs in under 2 minutes." : "Sign in to continue to JobHuntPro."}
            </p>

            {/* OAuth */}
            <div className="flex flex-col gap-3 mb-4">
              <button onClick={handleGoogle} disabled={!!oauthLoading}
                className="flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-jhp-black hover:bg-gray-50 transition-colors disabled:opacity-60 w-full">
                {oauthLoading === "google"
                  ? <Loader2 className="w-4 h-4 animate-spin text-jhp-gray" />
                  : <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                }
                Continue with Google
              </button>

              <button onClick={handleLinkedIn} disabled={!!oauthLoading}
                className="flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-jhp-black hover:bg-gray-50 transition-colors disabled:opacity-60 w-full">
                {oauthLoading === "linkedin"
                  ? <Loader2 className="w-4 h-4 animate-spin text-jhp-gray" />
                  : <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#0A66C2]">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                }
                Continue with LinkedIn
              </button>
            </div>

            {/* divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-100"/>
              <span className="text-[11px] font-bold text-jhp-gray uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-gray-100"/>
            </div>

            {/* email OTP */}
            <LoginForm />

            <p className="text-center text-[12px] text-jhp-gray mt-4 leading-snug">
              No password · Free forever · No card needed
            </p>
          </div>

          <p className="text-center text-xs text-jhp-gray mt-5">
            By continuing you agree to our{" "}
            <a href="/terms" className="underline hover:text-jhp-black">Terms</a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-jhp-black">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
