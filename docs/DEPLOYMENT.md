# Deployment (Ubuntu + Docker + Nginx)

## 1. Prepare the host

Install Docker Engine + Compose plugin, Git, and Nginx. Point DNS for your domain to the server. Open only SSH and HTTP/HTTPS in the firewall.

## 2. Configure environment

```bash
git clone https://github.com/AllenShiina-Mashiiro/allenshiina_blog.git
cd allenshiina_blog
git checkout v1.0.1-dev
cp .env.example .env
openssl rand -base64 48
```

Put the generated random value into `AUTH_SECRET` and set a separate random `APP_HASH_SECRET`. Set `DATABASE_URL` to `postgresql://allenshiina:<URL_ENCODED_PASSWORD>@db:5432/allenshiina_blog?schema=public`, `REDIS_URL=redis://redis:6379`, `NEXT_PUBLIC_SITE_URL`, SMTP, OAuth and object-storage values. Do not put real credentials into GitHub files or issue comments.

## 3. Start database and application

```bash
docker compose up -d db redis
# For the initial install only; review schema changes before production updates:
docker compose run --rm web npx prisma db push
docker compose up -d --build web
```

The web container binds to `127.0.0.1:3000`; Nginx proxies public traffic. Use a managed PostgreSQL backup plan and test restores.

## 4. Nginx and TLS

Copy `deploy/nginx/allenshiina_blog.conf` to `/etc/nginx/sites-available/allenshiina_blog`, replace `example.com`, obtain certificates with Certbot, enable the site, run `nginx -t`, then reload Nginx. Keep TLS private keys outside the repository. The proxy permits 35 MB request bodies, but production media should upload directly to S3-compatible storage using signed URLs.

## 5. Storage CORS

Configure the bucket to allow `PUT` from the exact public site origin and expose the required response headers. Keep the bucket private if using a CDN or signed GET URLs; the current implementation stores a public URL and therefore expects read access through `S3_PUBLIC_BASE_URL`. Restrict write permissions to the application key.

## 6. OAuth callbacks

Configure Google and GitHub applications with the Auth.js callback URL for your deployed domain (normally `/api/auth/callback/google` and `/api/auth/callback/github`). Store client secrets only in `.env` / deployment secrets. OAuth provider profiles need unique usernames; review collisions when importing existing users.

## 7. Admin and scheduled cleanup

Set `ADMIN_EMAIL` to an address you control, complete verified sign-in, then run `npm run db:seed`. The GitHub scheduled cleanup requires repository secret `DATABASE_URL`; alternatively schedule `npm run chat:cleanup` with cron on the host. It deletes messages older than 180 days.

## 8. Backups and maintenance

Back up PostgreSQL and object storage independently. Test recovery. Rotate SMTP/OAuth/S3 credentials, update Node dependencies, monitor logs, and run `npm run typecheck` plus `npm run build` before releases. For schema evolution, create and commit Prisma migrations in a development database and apply them with `prisma migrate deploy`; do not rely on `db push` as the long-term production migration strategy.
