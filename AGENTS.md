# AGENTS.md

## Cursor Cloud specific instructions

Modulia is a **Next.js 15 (App Router) + TypeScript + Tailwind** marketing site and
modular-house **configurator**, with an optional **Supabase**-backed CRM `/backoffice`
and a `/api/contact` lead form. Deployed on Netlify via `@netlify/plugin-nextjs`.
Standard commands live in `package.json` and `README.md`; use those rather than duplicating them here.

### Running / testing

- Dev server: `npm run dev` (http://localhost:3000). The update script already runs `npm install --legacy-peer-deps`, so dependencies are ready on boot.
- Lint / build: `npm run lint`, `npm run build`. Both pass. Lint currently emits one pre-existing unused-var warning in `src/components/SiteHeader.tsx` (non-blocking).
- If `.next` gets into a bad state, reset with `npm run dev:reset` (deletes `.next`), then `npm run dev`.

### Non-obvious gotchas

- Use `npm install --legacy-peer-deps` (matches Netlify's `NPM_FLAGS`). Plain `npm ci` fails because `package-lock.json` is slightly out of sync with an optional transitive dep (`@emnapi/runtime`). Running `npm install` rewrites the lockfile — do not commit that incidental change.
- The public site + configurator (`/`, `/personnaliser`, `/modelos`, `/cuisines`, `/piscine`, etc.) run fully **without Supabase credentials**. `src/lib/supabase/middleware.ts` no-ops when Supabase env vars are absent.
- What **requires real Supabase keys**: `/login` + `/backoffice` (Auth) and lead persistence in `/api/contact` (calls the `submit_public_lead` RPC). Without a valid `NEXT_PUBLIC_SUPABASE_ANON_KEY` these flows will error; the marketing/configurator flows are unaffected.
- Local env lives in `.env.local` (gitignored). Copy `.env.example`. The `NEXT_PUBLIC_SUPABASE_URL` is public; the anon key is a real secret and is not in the repo. To exercise auth/CRM/lead-saving, add a real `NEXT_PUBLIC_SUPABASE_ANON_KEY` (and `SUPABASE_SERVICE_ROLE_KEY` for backoffice user creation) via secrets.
- Node: `.nvmrc`/Netlify pin Node 20, but `engines` is `>=20` and the system Node 22 works for dev, lint, and build.
- Locale is cookie-driven (`NEXT_LOCALE`, default `fr`; also `pt`, `en`) via `next-intl`; the middleware sets it from `Accept-Language` on first visit.
