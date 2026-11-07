# Deployment

Requirements: Ubuntu, Docker Engine + Compose, Nginx, domain/TLS, PostgreSQL 18, Redis and an S3-compatible bucket.

1. Clone the repository and check out `v1.0.1-dev`.
2. Copy `.env.example` to `.env`; set a random `AUTH_SECRET` and separate `APP_HASH_SECRET`. Configure DATABASE_URL to use host `db` inside Compose, REDIS_URL, SMTP, OAuth and S3 settings. Never commit .env.
3. Configure S3 bucket CORS to allow PUT from the exact site origin. Restrict write credentials.
4. Start services with `docker compose up -d db redis`; for an initial disposable environment use `npx prisma db push`; then build/start the web service.
5. Configure Nginx from `deploy/nginx/allenshiina_blog.conf`, replace example.com, install TLS certificates outside Git, run `nginx -t` and reload.
6. Set ADMIN_EMAIL, register and verify that address, then run `npm run db:seed` to promote it and create the official room.
7. Set GitHub secret DATABASE_URL for scheduled 180-day chat cleanup, or run `npm run chat:cleanup` from a host cron.
8. Back up PostgreSQL and object storage separately; test restores.

For production schema changes, generate and commit reviewed Prisma migrations and use `prisma migrate deploy`; do not use `db push` as the long-term production migration strategy.