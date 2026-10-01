import Link from "next/link";
import { Brain, LayoutDashboard, FileText, BookOpen, BarChart2, Settings, Star } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/resume", icon: FileText, label: "My Resume" },
  { href: "/tracker", icon: BarChart2, label: "Tracker" },
  { href: "/gap-analysis", icon: BookOpen, label: "Skill Gaps" },
  { href: "/pricing", icon: Star, label: "Upgrade" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Sidebar nav */}
      <aside className="w-56 shrink-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col">
        <Link href="/dashboard" className="flex items-center gap-2.5 px-5 h-16 border-b border-gray-100 dark:border-gray-800">
          <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white">JobAI</span>
        </Link>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <Icon className="w-4 h-4 group-hover:text-brand transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100 dark:border-gray-800">
          <div className="bg-brand/10 rounded-xl p-3 text-center">
            <p className="text-xs text-brand font-medium mb-1.5">Free plan · 50/day</p>
            <Link
              href="/pricing"
              className="block text-xs bg-brand text-white py-1.5 rounded-lg font-medium hover:bg-brand-hover transition-colors"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
