# allenshiina_blog

AllenShiina personal blog & community platform.

- Repository: https://github.com/AllenShiina-Mashiiro/allenshiina_blog
- Active branch: `v1.0.1-dev`
- Stable branch: `master`
- Stack target: Next.js App Router, React, TypeScript, PostgreSQL 18, Prisma, Redis, Socket.IO, S3-compatible object storage, Nginx.

## Development policy

All feature work happens on `v1.0.1-dev`. `master` is reserved for tested releases. Never commit secrets, SMTP app passwords, OAuth client secrets, database credentials, or storage credentials. Use environment variables and keep `.env` out of Git.

## Requirements baseline

The complete 21-section product brief supplied by the project owner is the source of truth. See [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) for the implementation acceptance checklist.

## Reference material

- Mizuki visual references: https://mizuki.mysqil.com/ and https://blog.mysqil.com/
- Contribution wall inspiration: https://github.com/AllenShiina-Mashiiro/sakura-game-archive/tree/v2.5-dev
- Acknowledgement: Bilibili creator「松坂有希」, https://space.bilibili.com/701864046

This repository is a new project. The previous `AllenShiina-blog-beta` repository remains unchanged.

## Current status

The repository and requested branches have been created. This does **not** mean the v1.0.1-dev feature set is complete. Authentication, database-backed content, uploads, moderation, notifications, chat, deployment, and end-to-end verification must not be represented as complete until implemented and tested.
