# allenshiina_blog

AllenShiina personal blog & community platform · target release **v1.0.1-dev**.

- Repository: https://github.com/AllenShiina-Mashiiro/allenshiina_blog
- Active development branch: `v1.0.1-dev`
- Stable release branch: `master`
- Requested visibility: Public
- Previous `AllenShiina-blog-beta` repository remains unchanged.

## Product requirements

The owner-provided 21-section `prompt-words.txt` is the source of truth. The complete acceptance checklist is in [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md).

## Architecture target

Next.js App Router, React, TypeScript, PostgreSQL 18, Prisma, Auth.js, Redis, SSE chat delivery, S3-compatible object storage (OSS/COS/S3), Nodemailer SMTP, PhotoSwipe, KaTeX, highlight.js, optional PixiJS Live2D, Docker, Linux and Nginx.

## References and credits

- Visual references: https://mizuki.mysqil.com/ and https://blog.mysqil.com/
- Contribution-wall inspiration: https://github.com/AllenShiina-Mashiiro/sakura-game-archive/tree/v2.5-dev
- Thanks to Bilibili creator「松坂有希」for open-source inspiration and implementation ideas: https://space.bilibili.com/701864046

## Development and release

All day-to-day work belongs on `v1.0.1-dev`. Do not merge to `master` until [docs/RELEASE-GATE.md](docs/RELEASE-GATE.md) passes.

- [Deployment guide](docs/DEPLOYMENT.md)
- [Implementation and verification status](docs/IMPLEMENTATION-STATUS.md)
- [21-section requirements checklist](docs/REQUIREMENTS.md)

**Important:** source implementation, provider configuration and production verification are different things. Do not claim v1.0.1-dev is complete until the source is committed, dependencies install cleanly, Prisma validates, the production build passes, and all release-gate tests pass. Keep all credentials in untracked `.env`; rotate any credential ever exposed in Git.
