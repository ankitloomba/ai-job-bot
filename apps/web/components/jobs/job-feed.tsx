"use client";

import { useState } from "react";
import { MapPin, Clock, ExternalLink, Bookmark, ChevronRight, Building2 } from "lucide-react";
import { AdBanner } from "@/components/ui/ad-banner";

// Placeholder data — replace with API call
const MOCK_JOBS = [
  { id: "1", title: "Senior Product Manager", company: "Flipkart", location: "Bengaluru", type: "Hybrid", portal: "LinkedIn", score: 91, posted: "2h ago", salary: "₹30–45 LPA", tags: ["Product Strategy", "Agile", "B2C"] },
  { id: "2", title: "Associate Director – PMO", company: "Infosys", location: "New Delhi", type: "On-site", portal: "Naukri", score: 87, posted: "5h ago", salary: "₹25–35 LPA", tags: ["PMO", "Stakeholder Mgmt", "PRINCE2"] },
  { id: "3", title: "Product Manager – Growth", company: "Swiggy", location: "Remote", type: "Remote", portal: "LinkedIn", score: 83, posted: "1d ago", salary: "₹20–30 LPA", tags: ["Growth", "A/B Testing", "SQL"] },
  { id: "4", title: "IT Project Manager", company: "HCL Technologies", location: "Noida", type: "On-site", portal: "Indeed", score: 74, posted: "1d ago", salary: "₹18–25 LPA", tags: ["PMP", "Delivery", "ITIL"] },
  { id: "5", title: "Delivery Manager", company: "Wipro", location: "Gurugram", type: "Hybrid", portal: "Naukri", score: 68, posted: "2d ago", salary: "₹22–32 LPA", tags: ["Client Delivery", "P&L", "Team Lead"] },
];

function ScoreRing({ score }: { score: number }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color = score >= 80 ? "#22C55E" : score >= 55 ? "#F59E0B" : "#EF4444";

  return (
    <div className="relative w-12 h-12 shrink-0">
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${fill} ${circ}`} strokeLinecap="round" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white">
        {score}
      </span>
    </div>
  );
}

const portalColors: Record<string, string> = {
  LinkedIn: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Naukri: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Indeed: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export function JobFeed() {
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {MOCK_JOBS.map((job, idx) => (
        <>
          <div
            key={job.id}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:border-brand/30 hover:shadow-sm transition-all group"
          >
            <div className="flex items-start gap-4">
              {/* Company logo placeholder */}
              <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-gray-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                  </div>
                  <ScoreRing score={job.score} />
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {job.location} · {job.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {job.posted}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${portalColors[job.portal] ?? "bg-gray-100 text-gray-600"}`}>
                    {job.portal}
                  </span>
                  {job.salary && <span className="font-medium text-gray-700 dark:text-gray-300">{job.salary}</span>}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {job.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50 dark:border-gray-800">
              <button
                onClick={() => toggleSave(job.id)}
                className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${saved.has(job.id) ? "text-brand" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${saved.has(job.id) ? "fill-brand" : ""}`} />
                {saved.has(job.id) ? "Saved" : "Save"}
              </button>

              <div className="flex gap-2">
                <a
                  href={`/jobs/${job.id}`}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Details <ChevronRight className="w-3 h-3" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-white bg-brand hover:bg-brand-hover px-4 py-1.5 rounded-lg transition-colors"
                >
                  Apply <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* AdSense between every 3rd job card */}
          {(idx + 1) % 3 === 0 && idx < MOCK_JOBS.length - 1 && (
            <AdBanner key={`ad-${idx}`} slot={`33${idx}44${idx}55`} format="horizontal" />
          )}
        </>
      ))}
    </div>
  );
}
