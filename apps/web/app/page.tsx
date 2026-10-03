import Link from "next/link";
import { ArrowRight, Brain, Search, FileText, Zap, Star, Users, Building2, CheckCircle2 } from "lucide-react";
import { AdBanner } from "@/components/ui/ad-banner";

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

const portals = ["LinkedIn", "Naukri", "Indeed", "Shine", "Monster", "Instahyre", "AngelList", "Glassdoor", "Wellfound", "Company Sites"];

const steps = [
  { icon: FileText, step: "01", title: "Upload your resume", desc: "PDF or DOCX. Our AI extracts skills, titles and experience in seconds." },
  { icon: Brain,    step: "02", title: "AI scores every job", desc: "8-factor match: skills, seniority, location, salary — all weighed against your profile." },
  { icon: Search,   step: "03", title: "One ranked feed", desc: "Every job from every portal, deduped and sorted by match score. No more tab-switching." },
  { icon: ArrowRight, step: "04", title: "Apply in one click", desc: "Hit Apply and go straight to the job on its original portal — no re-filling forms." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-jhp-cream">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-jhp-gray">
            <Link href="#how" className="hover:text-jhp-black transition-colors">How it works</Link>
            <Link href="#portals" className="hover:text-jhp-black transition-colors">Job boards</Link>
            <Link href="#pricing" className="hover:text-jhp-black transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-jhp-gray hover:text-jhp-black px-3 py-2 transition-colors">
              Sign in
            </Link>
            <Link href="/login" className="text-sm bg-brand hover:bg-brand-hover text-white px-4 py-2.5 rounded-xl font-semibold transition-colors shadow-sm">
              Start free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-5 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-brand/10 text-brand text-[13px] font-semibold px-3.5 py-1.5 rounded-full mb-7">
          <Zap className="w-3.5 h-3.5" />
          AI-powered job matching · 50 k+ roles
        </div>

        <h1 className="text-[58px] md:text-[72px] font-black leading-[1.0] tracking-tight text-jhp-black mb-6 max-w-3xl mx-auto">
          Your AI job search,{" "}
          <span className="bg-gradient-to-r from-brand via-violet-500 to-pink-500 bg-clip-text text-transparent">
            on autopilot.
          </span>
        </h1>

        <p className="text-xl text-jhp-gray max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload your resume once. JobHuntPro scores every role across LinkedIn, Naukri, Indeed
          and&nbsp;10+ portals — ranked by fit percentage, duplicates removed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-7">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white px-7 py-4 rounded-2xl font-bold text-lg transition-colors shadow-md"
          >
            Start for free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white text-jhp-black hover:bg-gray-50 px-7 py-4 rounded-2xl font-bold text-lg transition-colors"
          >
            See a demo
          </Link>
        </div>

        <p className="text-[13px] text-jhp-gray">No password · No card · Free forever</p>

        {/* Hero preview card */}
        <div className="mt-14 max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-5 text-left">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-jhp-gray uppercase tracking-widest">Your job feed · 3 new matches</span>
            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">● Live</span>
          </div>
          {[
            { score: 94, title: "Senior Frontend Engineer", company: "Stripe", loc: "Remote · $150–200k", color: "#16A34A", badge: "Top match" },
            { score: 87, title: "Staff Software Engineer",  company: "Linear", loc: "San Francisco",      color: "#16A34A", badge: null },
            { score: 74, title: "Senior SWE",               company: "Figma",  loc: "missing: WebGL",     color: "#CA8A04", badge: null },
          ].map((job, i) => (
            <div key={i} className={`flex items-center gap-4 py-3 ${i < 2 ? "border-b border-gray-100" : ""}`}>
              <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-sm text-jhp-gray flex-shrink-0">
                {job.company[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-jhp-black text-sm">{job.title}</div>
                <div className="text-jhp-gray text-xs">{job.company} · {job.loc}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {job.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">{job.badge}</span>
                )}
                <span className="text-lg font-black" style={{ color: job.color }}>{job.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-gray-100 bg-white py-14">
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-3 gap-8 text-center">
          {[
            { value: "94%",    label: "Average match score" },
            { value: "50k+",   label: "Jobs indexed daily" },
            { value: "11 days", label: "Average time to hire" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl md:text-5xl font-black text-jhp-black tracking-tight">{s.value}</div>
              <div className="text-jhp-gray text-sm mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ad ── */}
      <div className="max-w-6xl mx-auto px-5 my-10">
        <AdBanner slot="1234567890" format="horizontal" />
      </div>

      {/* ── How it works ── */}
      <section id="how" className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-brand uppercase tracking-widest">How it works</span>
          <h2 className="text-4xl font-black text-jhp-black mt-3 tracking-tight">From resume to ranked matches<br/>in under 2 minutes.</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-xs font-black text-brand mb-4 tracking-widest">{step}</div>
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-brand" />
              </div>
              <h3 className="font-bold text-jhp-black mb-2">{title}</h3>
              <p className="text-sm text-jhp-gray leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Portals ── */}
      <section id="portals" className="bg-white border-y border-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-brand uppercase tracking-widest">Job boards</span>
            <h2 className="text-4xl font-black text-jhp-black mt-3 tracking-tight">Jobs from everywhere</h2>
            <p className="text-jhp-gray mt-3 text-lg">We search across every major portal so you don&apos;t have to.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {portals.map((p) => (
              <span key={p} className="px-4 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-jhp-black bg-jhp-cream hover:border-brand hover:text-brand transition-colors cursor-default">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ad ── */}
      <div className="max-w-6xl mx-auto px-5 my-10">
        <AdBanner slot="0987654321" format="horizontal" />
      </div>

      {/* ── Pricing ── */}
      <section id="pricing" className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-brand uppercase tracking-widest">Pricing</span>
          <h2 className="text-4xl font-black text-jhp-black mt-3 tracking-tight">Simple pricing. No surprises.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Free */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="font-black text-xl text-jhp-black mb-1">Free</div>
            <div className="text-4xl font-black text-jhp-black mb-1">₹0</div>
            <div className="text-jhp-gray text-sm mb-6">Forever free · No card needed</div>
            <ul className="space-y-3 mb-8">
              {["50 job matches/day", "Resume score + breakdown", "All job portals", "One-click apply"].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-jhp-black">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/login" className="block text-center border border-brand text-brand hover:bg-brand hover:text-white px-4 py-3 rounded-xl font-bold transition-colors text-sm">
              Get started free
            </Link>
          </div>

          {/* Pro */}
          <div className="bg-brand rounded-2xl p-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-4 right-4 text-[10px] font-black bg-white/20 text-white px-2.5 py-1 rounded-full tracking-widest uppercase">Popular</div>
            <div className="font-black text-xl text-white mb-1">Pro</div>
            <div className="text-4xl font-black text-white mb-1">₹299<span className="text-base font-normal text-white/70">/mo</span></div>
            <div className="text-white/70 text-sm mb-6">Cancel any time</div>
            <ul className="space-y-3 mb-8">
              {["Unlimited job matches", "AI cover letters", "Skill gap advisor", "Application tracker", "Priority support"].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white">
                  <CheckCircle2 className="w-4 h-4 text-white/80 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/pricing" className="block text-center bg-white text-brand hover:bg-jhp-cream px-4 py-3 rounded-xl font-bold transition-colors text-sm">
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-jhp-black py-20 text-center">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Land your next job faster.
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">Join thousands of professionals who've cut their job search time in half with AI-powered matching.</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors shadow-lg">
            Get started — it&apos;s free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-jhp-black border-t border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7"/>
                <line x1="16.5" y1="16.5" x2="21" y2="21"/>
              </svg>
            </div>
            <span className="font-extrabold text-white">JobHuntPro</span>
          </div>
          <div className="flex gap-6 text-sm text-white/50">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-white transition-colors">Terms</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <AdBanner slot="1122334455" format="small" />
        </div>
        <div className="max-w-6xl mx-auto px-5 mt-6 text-center">
          <p className="text-xs text-white/30">
            This site uses personalized advertising.{" "}
            <a href="https://www.youronlinechoices.com/uk/your-ad-choices" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/60">AdChoices</a>
            {" · "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/60">Google Ad Settings</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
