import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { JobFeed } from "@/components/jobs/job-feed";
import { AdBanner } from "@/components/ui/ad-banner";

export const metadata = { title: "Dashboard — JobAI" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <AppLayout>
      <div className="flex gap-6">
        {/* Main feed */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your matches
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Ranked by resume fit · Updated 2 hours ago
              </p>
            </div>
            <div className="flex gap-2">
              <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <option>All portals</option>
                <option>LinkedIn</option>
                <option>Naukri</option>
                <option>Indeed</option>
              </select>
              <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <option>All roles</option>
                <option>Full-time</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>
          </div>

          <JobFeed />
        </div>

        {/* Sidebar */}
        <aside className="w-72 shrink-0 hidden lg:block space-y-4">
          {/* Resume score card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Resume score</span>
              <span className="text-xs text-brand font-medium">View details →</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                  <circle
                    cx="32" cy="32" r="28"
                    fill="none" stroke="#4F6EF7" strokeWidth="6"
                    strokeDasharray={`${0.78 * 175.9} 175.9`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white">78</span>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Out of 100</div>
                <div className="text-xs font-medium text-amber-500 mt-0.5">Good · Room to improve</div>
              </div>
            </div>
          </div>

          {/* AdSense sidebar */}
          <AdBanner slot="2233445566" format="square" />

          {/* Quick stats */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 space-y-3">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">This week</span>
            {[
              { label: "Jobs matched", value: "142" },
              { label: "Strong matches (80%+)", value: "23" },
              { label: "Applied", value: "7" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">{label}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
