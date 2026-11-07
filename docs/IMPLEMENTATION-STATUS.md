# Implementation status — v1.0.1-dev

This document distinguishes source-code implementation from deployment verification. It is intentionally conservative: a route or UI control is not marked production-complete merely because it exists.

## Implemented in this source tree (requires dependency install and environment configuration)

- Next.js 15 / React 19 / TypeScript application skeleton and responsive Mizuki-inspired homepage.
- Supplied `SakuraPetals.tsx` particle component reused; global secondary-page effect; theme persistence; background URL carousel and editable hero/profile settings.
- Auth.js credentials, Google and GitHub provider wiring; six-digit SMTP registration code, hashed code storage, attempts/expiry, disclaimer acceptance, password reset links, password change, account provider unlinking.
- Username validation and reserved route names; `@username` profile route; profile personalization and daily homepage-like limit.
- Prisma schema for users, OAuth accounts, notes, moments, tags, comments, resources, anime, rooms/messages, notifications, assets, views, deletion requests and site settings.
- Public note/moment/resource/anime/room APIs; ownership/admin checks on writes; Markdown, KaTeX and syntax highlighting; comments/replies/edit/delete; moment likes/reposts.
- S3-compatible signed uploads, browser-side compression, SHA-256 verification against stored object bytes, image signature checks, asset references and post-database storage deletion.
- Room join modes, invite-code hashing, text/emoji messages, quote replies, @mention notifications and SSE delivery; 180-day cleanup script and scheduled workflow.
- Announcements, notification center, admin moderation endpoints, deletion approval and content preservation under `deleted_user`.
- Search by text/tag/category/date, statistics, calendar, SEO sitemap/robots, PhotoSwipe and optional dynamic Live2D runtime.
- Dockerfile, Compose, Nginx example, CI workflow and deployment documentation.

## Not yet verified or requiring owner/provider assets

- A clean `npm install`, Prisma schema validation/generation, TypeScript typecheck, Next production build and browser E2E suite have **not** been run in this environment because npm registry access timed out and dependencies are not installed.
- No PostgreSQL 18 / Redis / SMTP / S3 bucket is connected here. Real mail delivery, signed upload CORS, object permissions, migration rollout, backups and scheduled cleanup need deployment credentials and smoke tests.
- Google/GitHub OAuth flows require real provider applications and callback URLs. QQ Connect OAuth is not wired; QQ/NetEase email addresses can use the general SMTP registration flow. OAuth identity merge behavior needs a deliberate migration/test before enabling cross-provider auto-linking.
- Live2D code is dynamically loaded, but a licensed `.model3.json` model and Cubism Core runtime are not included. Set `NEXT_PUBLIC_LIVE2D_MODEL_URL` and provide the licensed runtime assets.
- Image crop UI, profile avatar upload UI, complete UI-wide English translation, full admin editing workflows, PostgreSQL full-text search, Redis Pub/Sub (SSE currently polls the database), and automated asset-orphan repair still need work.
- The Prisma schema is supplied without a generated initial migration directory. Use `prisma db push` for a disposable initial environment; generate and review migrations before production use.

## Release rule

Do not mark `v1.0.1-dev` complete or merge it to `master` until every required checkbox in `RELEASE-GATE.md` has passed in a clean environment. This status file must be updated with actual test results after those checks run.

## Local verification bundle update (2026-11-07)
- Added Windows PowerShell local-validation instructions, environment preflight script, and `/api/health` endpoint.
- Updated `.env.example` with Docker Compose database credentials and separate application/hash secrets.
- TypeScript/TSX syntax transpilation check: 92 files checked, 0 syntax diagnostics.
- `npm install` was attempted in the provided environment but timed out while accessing the npm registry. Therefore dependency-aware typecheck, Prisma validation/generation, Next production build, and runtime tests remain unverified.
- The local ZIP intentionally excludes `.env`, `node_modules`, database files, OAuth secrets, SMTP credentials and object-storage keys.
