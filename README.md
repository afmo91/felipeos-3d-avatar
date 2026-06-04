# Felipe OS 3D Avatar

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create local environment file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in the values you need in `.env.local`.
4. Start dev server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

If port 3000 is busy, use another port:

```bash
npm run dev -- --port 3001
```

## Environment Variables
Use `.env.example` as the source of truth:

- `NEXT_PUBLIC_SITE_URL`: public site URL for metadata, robots and sitemap.
- `NEXT_PUBLIC_BOOKING_URL`: Google Calendar appointment link. If empty, booking CTAs silently fall back to email.
- `AUTH_SECRET`, `AUTH_USERNAME`, `AUTH_PASSWORD`: protect `/admin` and tailored `/cv/[slug]` pages.
- `OPENAI_API_KEY`, `OPENAI_MODEL`: optional AI replies. Without a key, chat uses the local fallback map.
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`: optional lead storage and public CV reads using Supabase's current `sb_publishable_...` and `sb_secret_...` API keys.

Never commit `.env.local`.

`NEXT_PUBLIC_BOOKING_URL` must be set in Vercel to the Google Calendar Appointment Schedule link, then redeploy.

## Features
- Next.js App Router + TypeScript
- Tailwind CSS dark theme
- Chat-first 3D Felipe OS experience
- Contextual stage for services, proof of work, CV, contact and solution plans
- Local chat persistence with reset control
- Booking helper with Calendar URL and silent email fallback
- Public CV at `/cv` and direct PDF download at `/api/download/cv`
- Protected admin scaffold and tailored CV versions
- Optional Supabase lead capture after email consent
- Cookie preferences banner
