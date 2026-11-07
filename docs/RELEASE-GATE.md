# Release gate

Before merging v1.0.1-dev into master:

- [ ] Clean Node 22 npm install succeeds.
- [ ] Prisma validate/generate and PostgreSQL 18 migration deploy succeed.
- [ ] TypeScript typecheck, unit tests and Next production build pass.
- [ ] Browser E2E verifies registration, login, OAuth, password reset, authorization and logout.
- [ ] SMTP delivery, Google/GitHub callbacks and provider linking tested with real apps.
- [ ] S3 signed upload, SHA-256 verification, MIME signature, CORS and deletion lifecycle tested.
- [ ] Notes/moments, encryption, tags, comments/replies, likes/reposts and view deduplication tested.
- [ ] Chat SSE, invite joining, @mentions and 180-day cleanup tested.
- [ ] Admin moderation, announcements and account deletion/preservation tested.
- [ ] Profile likes 10/day and 04:00 reset verified under concurrency.
- [ ] Live2D model/Cubism assets licensed and production-tested, or feature explicitly disabled.
- [ ] Desktop/mobile browser checks, Ubuntu Docker/Nginx/TLS and backup restore pass.
- [ ] No secrets or personal data in Git history.

An unchecked item blocks release.