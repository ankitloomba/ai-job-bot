import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ResumeUploader } from "@/components/onboarding/resume-uploader";

export const metadata = { title: "Upload Resume — JobAI" };

export default async function UploadPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-xl">
        {/* Step indicator */}
        <div className="flex items-center gap-2 justify-center mb-8">
          {["Upload", "Review", "Preferences", "Done"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-brand text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
                {i + 1}
              </div>
              <span className={`text-sm ${i === 0 ? "font-semibold text-gray-900 dark:text-white" : "text-gray-400"}`}>{step}</span>
              {i < 3 && <div className="w-8 h-px bg-gray-200 dark:bg-gray-700" />}
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Upload your resume
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            AI extracts your skills, experience and titles automatically. PDF or DOCX, max 5MB.
          </p>
          <ResumeUploader />
        </div>
      </div>
    </div>
  );
}
