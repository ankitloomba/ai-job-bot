import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Brain, Search, FileText, Zap, Star, Users, Building2 } from "lucide-react";
import { AdBanner } from "@/components/ui/ad-banner";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" width={32} height={32} alt="JobAI" className="rounded-lg" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">JobAI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-brand/10 text-brand text-sm font-medium px-3 py-1.5 rounded-full mb-6">
          <Zap className="w-3.5 h-3.5" />
          AI-powered job matching for India
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Upload resume once.
          <br />
          <span className="text-brand">AI finds your jobs.</span>
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          JobAI scans your resume, scores every job across LinkedIn, Naukri, Indeed and 10+ portals,
          and ranks them by match percentage. Apply in one click.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white px-6 py-3.5 rounded-xl font-semibold text-lg transition-colors"
          >
            Start matching jobs free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3.5 rounded-xl font-semibold text-lg transition-colors"
          >
            Sign in
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">Free forever · No credit card · 50 matches/day</p>
      </section>

      {/* AdSense — Top Banner */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <AdBanner slot="1234567890" format="horizontal" />
      </div>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: FileText, step: "1", title: "Upload Resume", desc: "PDF or DOCX. AI extracts skills, experience and titles automatically." },
            { icon: Brain, step: "2", title: "AI Scores You", desc: "8-factor scoring: skills, experience, role fit, education and more." },
            { icon: Search, step: "3", title: "Jobs Ranked", desc: "Every job from Naukri, LinkedIn, Indeed ranked by your match %." },
            { icon: ArrowRight, step: "4", title: "One-click Apply", desc: "Hit Apply and go directly to the job on the original portal." },
          ].map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-brand" />
              </div>
              <div className="text-xs font-bold text-brand mb-2">STEP {step}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Building2, value: "10+", label: "Job portals covered" },
              { icon: Star, value: "95%", label: "Match accuracy" },
              { icon: Users, value: "Free", label: "To get started" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <Icon className="w-8 h-8 text-brand mx-auto mb-3" />
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
                <div className="text-gray-500 dark:text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Jobs from everywhere
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
          We search across India&apos;s top job portals so you don&apos;t have to
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {["LinkedIn", "Naukri", "Indeed", "Shine", "Monster", "Instahyre", "AngelList", "Glassdoor", "Wellfound", "Company Sites"].map((p) => (
            <span
              key={p}
              className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* AdSense — Mid Banner */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <AdBanner slot="0987654321" format="horizontal" />
      </div>

      {/* Pricing preview */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Simple pricing
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">Free</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">₹0</div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <li>✓ 50 job matches/day</li>
              <li>✓ Resume score + breakdown</li>
              <li>✓ All portals</li>
              <li>✓ Apply button</li>
            </ul>
            <Link href="/signup" className="block text-center border border-brand text-brand hover:bg-brand hover:text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm">
              Get started
            </Link>
          </div>
          <div className="border-2 border-brand rounded-2xl p-6 bg-brand/5">
            <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">Pro</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">₹299<span className="text-base font-normal text-gray-500">/mo</span></div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <li>✓ Unlimited matches</li>
              <li>✓ AI cover letters</li>
              <li>✓ Skill gap advisor</li>
              <li>✓ Application tracker</li>
              <li>✓ Priority support</li>
            </ul>
            <Link href="/pricing" className="block text-center bg-brand hover:bg-brand-hover text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm">
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" width={24} height={24} alt="JobAI" className="rounded" />
            <span className="font-semibold text-gray-700 dark:text-gray-300">JobAI</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white">Terms</Link>
            <Link href="/pricing" className="hover:text-gray-900 dark:hover:text-white">Pricing</Link>
          </div>
          {/* AdSense — Footer */}
          <AdBanner slot="1122334455" format="small" />
        </div>
        {/* AdChoices compliance */}
        <div className="max-w-6xl mx-auto px-4 mt-4 text-center">
          <p className="text-xs text-gray-400">
            This site uses personalized advertising.{" "}
            <a
              href="https://www.youronlinechoices.com/uk/your-ad-choices"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600"
            >
              AdChoices
            </a>{" "}
            ·{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600"
            >
              Google Ad Settings
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
