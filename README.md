# JobAI — Personal AI Job Bot

AI-powered job discovery and matching. Upload resume once → AI finds, scores, and ranks jobs across LinkedIn, Naukri, Indeed and 10+ portals.

## Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Auth**: NextAuth.js v5 (Google, LinkedIn, Email OTP)
- **Database**: PostgreSQL + Prisma + pgvector
- **AI/ML**: Gemini 1.5 Flash (cover letters) · Groq/Llama (skill extraction) · sentence-transformers local (matching)
- **Ads**: Google AdSense + Meta Pixel
- **Deploy**: Vercel (frontend) · Railway (backend)

## Quick start

```bash
cd apps/web
cp .env.example .env.local
# Fill in your keys
npm install
npx prisma migrate dev
npm run dev
```

## Page map

| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | Sign in |
| `/signup` | Create account |
| `/onboarding/upload` | Resume upload |
| `/onboarding/parsing` | AI parsing progress |
| `/onboarding/review` | Review extracted data |
| `/onboarding/preferences` | Job preferences |
| `/dashboard` | Job feed with match scores |
| `/jobs/[id]` | Job detail + apply |
| `/resume` | My resume + score |
| `/tracker` | Application tracker |
| `/gap-analysis` | Skill gaps + courses |
| `/pricing` | Free vs Pro |

## Environment variables

See `apps/web/.env.example` for all required keys.

## Ad placements

- Landing top banner — slot `1234567890`
- Landing mid banner — slot `0987654321`  
- Dashboard sidebar — slot `2233445566`
- Between every 3rd job card — dynamic slots
- Footer — slot `1122334455`

Replace `ca-pub-XXXXXXXXXXXXXXXX` in `layout.tsx` and `ad-banner.tsx` with your AdSense publisher ID after approval.
