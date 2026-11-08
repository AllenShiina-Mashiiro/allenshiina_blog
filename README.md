# allenshiina_blog

**AllenShiina personal blog & community** · `v2.0.1-dev`

A Next.js App Router application for study notes, resource navigation, moments, anime records, public chat rooms, user profiles, notifications and admin moderation. The visual direction adapts Mizuki's glass navigation, image-led hero, responsive card composition, and theme atmosphere while keeping this project on Next.js so authentication, PostgreSQL-backed content, profiles, comments, notifications, and community features remain server-driven. The Sakura particle component is based on the supplied `SakuraPetals.tsx`.

## Branch policy

- `v2.0.1-dev`: current feature development and integration.
- `master`: stable releases only; merge only after the release gate passes.
- `main`: repository bootstrap branch; do not use for day-to-day development.

## Stack

- Next.js 15 App Router, React 19, TypeScript
- PostgreSQL 18, Prisma ORM
- Auth.js / NextAuth, Google OAuth, GitHub OAuth, Credentials login
- Nodemailer SMTP email verification and password reset
- Redis rate limiting/cache foundation
- S3-compatible object storage (Aliyun OSS / Tencent COS / AWS S3)
- React Markdown, remark-gfm, KaTeX, highlight.js, PhotoSwipe
- PixiJS + pixi-live2d-display (requires licensed Live2D model and Cubism Core runtime)
- Docker, Linux, Nginx, GitHub Actions

## Local development

Requirements: Node.js 22+, npm or pnpm, PostgreSQL 18. Redis is recommended but optional. Image upload uses local disk by default; S3-compatible storage is optional.

```bash
cp .env.example .env
# Fill DATABASE_URL and AUTH_SECRET. SMTP is needed for email features; OAuth / Redis / S3 are optional.
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Open `http://localhost:3000`. To bootstrap the admin role, set `ADMIN_EMAIL` before signing in with that verified email. Run `npm run db:seed` to create the reserved `deleted_user` system account.

## Required environment

See `.env.example`. Never commit `.env`, database passwords, OAuth secrets, SMTP app passwords, or S3 credentials. If any credential was ever committed, revoke and rotate it immediately. Image uploads default to `STORAGE_DRIVER=local` and are stored under `UPLOAD_DIR` (default `./data/uploads`). Keep this directory persistent and back it up with the database. For multi-instance production or external object storage, set `STORAGE_DRIVER=s3` and configure `S3_ENDPOINT` (if non-AWS), `S3_BUCKET`, access key, secret, and `S3_PUBLIC_BASE_URL`. Local-disk mode is best for a single server or a deployment with a persistent shared volume.

Google and GitHub OAuth are enabled when their client ID/secret pairs are configured. QQ and NetEase mailbox addresses can use ordinary email registration; dedicated QQ OAuth requires an approved QQ Connect application and its provider configuration. Do not claim it is enabled until credentials and callback verification are completed.

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) and [docs/IMPLEMENTATION-STATUS.md](docs/IMPLEMENTATION-STATUS.md). Docker Compose provides PostgreSQL 18, Redis and the Next.js standalone server. Nginx configuration is in `deploy/nginx/`. Use TLS certificates from your own certificate provider.

## Operations

- `npm run db:push`: initial schema sync; for production releases, generate and commit Prisma migrations before using `prisma migrate deploy`.
- `npm run db:seed`: create the system deleted-user identity and promote the configured admin email if it already exists.
- `npm run chat:cleanup`: remove chat messages older than `CHAT_RETENTION_DAYS` (default 180).
- GitHub Actions runs CI checks and a daily scheduled chat-retention cleanup. Configure the repository secret `DATABASE_URL` for the scheduled job.
- `GET /api/stats` exposes public aggregate counts. Daily view deduplication uses a visitor hash stored in PostgreSQL.

## Important implementation status

This repository contains an integrated first implementation of the main application and API paths, but a code commit is not proof that every requested production feature is complete. In particular, real OAuth provider credentials, SMTP delivery, S3 bucket permissions/CORS, Live2D model/Cubism runtime assets, QQ Connect, deployment secrets, load testing, security review, and full end-to-end verification must be configured and tested in the target environment. Review [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) and [docs/RELEASE-GATE.md](docs/RELEASE-GATE.md) before calling a release complete.

## Credits and references

- Design reference: [Mizuki](https://mizuki.mysqil.com/), [blog.mysqil.com](https://blog.mysqil.com/)
- Contribution-wall inspiration: [sakura-game-archive](https://github.com/AllenShiina-Mashiiro/sakura-game-archive/tree/v2.5-dev)
- Thanks to Bilibili creator **松坂有希** for the open-source inspiration and implementation ideas: https://space.bilibili.com/701864046
- The previous `AllenShiina-blog-beta` repository is separate and remains untouched.

## Local validation on Windows

See [docs/LOCAL-VALIDATION-WINDOWS.md](docs/LOCAL-VALIDATION-WINDOWS.md). After copying `.env.example` to `.env`, run `npm run check:env`, `npm install`, `npm run db:validate`, `npm run db:generate`, `npm run db:push`, `npm run db:seed`, then `npm run dev`.

Health endpoint: `/api/health` (database readiness plus optional dependency status).
