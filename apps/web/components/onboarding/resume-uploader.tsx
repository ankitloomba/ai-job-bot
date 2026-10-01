"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { Upload, FileText, CheckCircle2, Loader2, X } from "lucide-react";

export function ResumeUploader() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback((accepted: File[], rejected: { errors: { message: string }[] }[]) => {
    setError("");
    if (rejected.length > 0) {
      setError("Only PDF or DOCX files under 5MB are accepted.");
      return;
    }
    setFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxSize: 5 * 1024 * 1024,
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const form = new FormData();
      form.append("resume", file);

      const res = await fetch("/api/resume/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");

      router.push("/onboarding/parsing");
    } catch {
      setError("Upload failed. Please try again.");
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all
          ${isDragActive ? "border-brand bg-brand/5" : "border-gray-200 dark:border-gray-700 hover:border-brand/50 hover:bg-gray-50 dark:hover:bg-gray-800/50"}
          ${file ? "border-green-400 bg-green-50 dark:bg-green-900/10" : ""}
        `}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
            <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center">
              <Upload className="w-7 h-7 text-brand" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {isDragActive ? "Drop it here" : "Drag & drop your resume"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                or <span className="text-brand">browse files</span> · PDF or DOCX · Max 5MB
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/10 px-4 py-3 rounded-xl">
          <X className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {file && (
        <div className="flex gap-3">
          <button
            onClick={() => setFile(null)}
            className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Change file
          </button>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="flex-1 bg-brand hover:bg-brand-hover text-white py-3 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading…
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Parse my resume
              </>
            )}
          </button>
        </div>
      )}

      <p className="text-xs text-center text-gray-400">
        Your resume is private and encrypted. We never share it.
      </p>
    </div>
  );
}
