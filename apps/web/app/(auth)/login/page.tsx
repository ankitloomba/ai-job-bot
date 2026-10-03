"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

const slides = [
  {
    badge: "Connect your job boards",
    headline: ["Every job board.", "One feed."],
    accentStart: 1,
    accentWords: ["One", "feed."],
    body: "Connect LinkedIn, Naukri, Glassdoor and more. We pull every listing into one ranked feed, with duplicates removed.",
    logos: [
      { label: "in", bg: "#0A66C2" },
      { label: "N",  bg: "#2563EB" },
      { label: "G",  bg: "#34A853" },
      { label: "M",  bg: "#7C3AED" },
      { label: "i",  bg: "#374151" },
    ],
  },
  {
    badge: "AI match scores",
    headline: ["Every role,", "scored for you."],
    accentStart: 1,
    accentWords: ["scored", "for", "you."],
    body: "Our AI reads your resume and scores every job for fit — so you always apply where you have the best shot.",
    jobs: [
      { score: 94, title: "Senior Frontend Engineer", sub: "Stripe · Remote · $150–200k", pct: "94% fit", color: "#16A34A" },
      { score: 87, title: "Staff Engineer",            sub: "Linear · San Francisco",       pct: "87% fit", color: "#16A34A" },
      { score: 74, title: "Senior Software Engineer",  sub: "Figma · missing WebGL",        pct: "74% fit", color: "#D97706" },
    ],
  },
  {
    badge: "Auto-apply coming soon",
    headline: ["Your AI job search,", "on autopilot."],
    accentStart: 1,
    accentWords: ["on", "autopilot."],
    body: "Match to 50k+ roles. Apply automatically. JobHuntPro works while you sleep.",
    stat: { match: "94%", jobs: "50k+", days: "11 days", labels: ["Match score", "Jobs indexed", "Avg. time to hire"] },
  },
];

export default function LoginPage() {
  const [slide, setSlide] = useState(0);
  const [tab, setTab] = useState<"create" | "signin">("create");

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const s = slides[slide];

  return (
    <div className="min-h-screen flex">
      {/* ── Left: hero carousel ── */}
      <div
        className="hidden lg:flex flex-1 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #dde9ff 0%, #f0e8ff 35%, #fce7f3 65%, #f9fafb 100%)",
        }}
      >
        {/* grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.2"/>
              <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="11" cy="11" r="2.5" fill="currentColor" opacity="0.6"/>
            </svg>
          </div>
          <span className="font-bold text-xl text-jhp-black">JobHuntPro</span>
        </div>

        {/* Slide content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-lg">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-white/60 rounded-full px-3 py-1.5 mb-6 w-fit">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-jhp-black">{s.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-jhp-black mb-4">
            {s.headline.map((line, i) => (
              <span key={i} className="block">
                {i === s.accentStart
                  ? line.split(" ").map((word, wi) => (
                      <span
                        key={wi}
                        className={s.accentWords.includes(word) ? "bg-gradient-to-r from-brand via-purple-500 to-pink-500 bg-clip-text text-transparent" : ""}
                      >
                        {word}{wi < line.split(" ").length - 1 ? " " : ""}
                      </span>
                    ))
                  : line}
              </span>
            ))}
          </h1>

          <p className="text-jhp-gray text-lg mb-8 leading-relaxed">{s.body}</p>

          {/* Slide-specific visual */}
          {s.logos && (
            <div className="flex items-center gap-3">
              {s.logos.map((logo, i) => (
                <div
                  key={i}
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm"
                  style={{ background: logo.bg }}
                >
                  {logo.label}
                </div>
              ))}
              <span className="text-jhp-gray text-sm ml-1">+ more soon</span>
            </div>
          )}

          {s.jobs && (
            <div className="flex flex-col gap-3">
              {s.jobs.map((job, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-4 border border-white/60">
                  <span className="text-2xl font-black" style={{ color: job.color }}>{job.score}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-jhp-black text-sm">{job.title}</div>
                    <div className="text-jhp-gray text-xs">{job.sub}</div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${job.color}20`, color: job.color }}>
                    {job.pct}
                  </span>
                </div>
              ))}
            </div>
          )}

          {s.stat && (
            <div className="flex gap-8">
              {[s.stat.match, s.stat.jobs, s.stat.days].map((val, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-jhp-black">{val}</div>
                  <div className="text-jhp-gray text-sm">{s.stat!.labels[i]}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dots */}
        <div className="relative z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`rounded-full transition-all duration-300 ${i === slide ? "w-6 h-2 bg-brand" : "w-2 h-2 bg-jhp-gray/40"}`}
            />
          ))}
        </div>
      </div>

      {/* ── Right: auth card ── */}
      <div className="flex-1 lg:max-w-md flex items-center justify-center bg-jhp-cream px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.2"/>
                <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                <circle cx="11" cy="11" r="2.5" fill="currentColor" opacity="0.6"/>
              </svg>
            </div>
            <span className="font-bold text-xl text-jhp-black">JobHuntPro</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            {/* Tab switcher */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => setTab("create")}
                className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all ${tab === "create" ? "bg-white text-jhp-black shadow-sm" : "text-jhp-gray"}`}
              >
                Create account
              </button>
              <button
                onClick={() => setTab("signin")}
                className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all ${tab === "signin" ? "bg-white text-jhp-black shadow-sm" : "text-jhp-gray"}`}
              >
                Sign in
              </button>
            </div>

            {/* OAuth buttons */}
            <div className="flex flex-col gap-3 mb-4">
              <Link
                href="/api/auth/signin/google"
                className="flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium text-jhp-black hover:bg-gray-50 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </Link>
              <Link
                href="/api/auth/signin/linkedin"
                className="flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium text-jhp-black hover:bg-gray-50 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#0A66C2]">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Continue with LinkedIn
              </Link>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-jhp-gray font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Email OTP form */}
            <LoginForm />

            <p className="text-center text-xs text-jhp-gray mt-4">
              No password. Free forever plan, no card needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
