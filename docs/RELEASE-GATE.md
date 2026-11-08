# v2.0.1-dev release gate

A feature is only marked complete after implementation, authorization checks, automated tests, and environment verification. The owner-provided 21-section `prompt-words.txt` is the product source of truth; see `REQUIREMENTS.md` for the detailed acceptance checklist.

Before merging to `master`:

- [ ] `npm install` succeeds on a clean Node 22 environment.
- [ ] `npx prisma validate`, schema generation, and migration deploy succeed against PostgreSQL 18.
- [ ] `npm run typecheck` and `npm run build` pass.
- [ ] CI passes; add integration and browser E2E coverage for authentication, ownership, moderation, file lifecycle and chat retention.
- [ ] Google/GitHub OAuth callback flows verified with real provider apps; SMTP verification and reset emails delivered; QQ Connect explicitly configured if offered.
- [ ] S3-compatible signed upload, CORS, SHA-256 metadata, deduplication and deletion verified.
- [ ] Live2D model and Cubism Core assets supplied under valid license; dynamic import tested in production browser.
- [ ] PhotoSwipe, Markdown sanitization, KaTeX and code highlighting verified.
- [ ] Chat 180-day cleanup and notifications tested.
- [ ] Profile likes daily reset at 04:00 verified under concurrency.
- [ ] Account deletion preserves note/moment content and referenced media, removes other personal assets and data.
- [ ] Admin controls and all authorization boundaries tested server-side.
- [ ] Mobile Safari/Chrome and desktop Chrome/Firefox checked.
- [ ] Ubuntu Docker + Nginx deployment, TLS, backup and restore tested.
- [ ] No secrets, private keys, user data, or real OAuth/SMTP credentials in Git history.

Do not merge or tag a production release while any required checkbox is incomplete.
