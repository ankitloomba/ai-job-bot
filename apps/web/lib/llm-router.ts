/**
 * LLM Router — Gemini primary, Groq fallback
 * Gemini: cover letters, gap analysis (quality-sensitive)
 * Groq:   skill extraction, structured JSON (speed-sensitive)
 */

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

async function callGemini(prompt: string): Promise<string> {
  const res = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    }),
  });
  if (!res.ok) throw new Error(`Gemini error: ${res.status}`);
  const data = await res.json();
  return data.candidates[0].content.parts[0].text as string;
}

async function callGroq(prompt: string, systemPrompt?: string): Promise<string> {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-70b-versatile",
      messages: [
        ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 1024,
    }),
  });
  if (!res.ok) throw new Error(`Groq error: ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content as string;
}

// ─── Public API ───────────────────────────────────────────────────

export async function generateCoverLetter(params: {
  name: string;
  role: string;
  company: string;
  resumeHighlights: string;
  jdKeywords: string;
}): Promise<string> {
  const prompt = `You are a professional cover letter writer for the Indian job market.
Write a cover letter for ${params.name} applying for ${params.role} at ${params.company}.

Resume highlights: ${params.resumeHighlights}
Job keywords to address: ${params.jdKeywords}

Format EXACTLY:
[Opening paragraph – 2 sentences, mention company name and role]
[Skills paragraph – 3 bullet points matching these keywords: ${params.jdKeywords}]
[Experience paragraph – 2 sentences using: ${params.resumeHighlights}]
[Closing – 1 sentence call to action]

Tone: professional, confident, concise. Length: 180–220 words. No salutation or sign-off.`;

  return callGemini(prompt);
}

export async function analyzeSkillGaps(params: {
  resumeSkills: string[];
  jdSkills: string[];
  targetRole: string;
}): Promise<{ gaps: string[]; courses: { skill: string; platform: string; url: string }[] }> {
  const prompt = `Analyse skill gaps for a ${params.targetRole} role.

Candidate has: ${params.resumeSkills.join(", ")}
Job requires: ${params.jdSkills.join(", ")}

Return JSON only, no markdown:
{
  "gaps": ["skill1", "skill2"],
  "courses": [
    {"skill": "skill1", "platform": "Udemy", "url": "https://udemy.com/courses/skill1"},
    {"skill": "skill2", "platform": "Coursera", "url": "https://coursera.org/search?query=skill2"}
  ]
}`;

  const raw = await callGemini(prompt);
  return JSON.parse(raw.replace(/```json|```/g, "").trim());
}

export async function extractSkillsFromResume(resumeText: string): Promise<{
  skills: string[];
  titles: string[];
  experienceYears: number;
  education: string[];
}> {
  const systemPrompt = `You are a resume parser. Return structured JSON only, no markdown, no explanation.`;
  const prompt = `Parse this resume and extract:
- skills: array of technical and soft skills
- titles: array of job titles held
- experienceYears: total years of experience (number)
- education: array of degrees/institutions

Resume text:
${resumeText.slice(0, 4000)}

Return JSON:
{"skills":[],"titles":[],"experienceYears":0,"education":[]}`;

  const raw = await callGroq(prompt, systemPrompt);
  return JSON.parse(raw.replace(/```json|```/g, "").trim());
}
