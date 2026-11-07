# Windows 11 本地验证（PowerShell）

> 本仓库仍是开发版本。首次启动需要本机 Node.js 22、Docker Desktop（推荐）或 PostgreSQL 18 + Redis 7、可用 SMTP；邮箱验证码与对象存储上传不会在未配置服务时自动模拟成功。

## 1. 解压与环境

```powershell
Expand-Archive .\AllenShiina-blog-v1.0.1-dev.zip -DestinationPath .
cd .\allen-build
Copy-Item .env.example .env
```

编辑 `.env`：至少设置 `POSTGRES_PASSWORD`、`DATABASE_URL`、`AUTH_SECRET`、`APP_HASH_SECRET`。本地运行 Next.js 时数据库主机使用 `localhost`。`AUTH_SECRET` 与 `APP_HASH_SECRET` 应使用不同随机值，可用 `openssl rand -base64 32` 生成。

## 2. 启动 PostgreSQL 18 与 Redis

Docker Desktop 启动后：

```powershell
docker compose up -d db redis
```

确认服务：

```powershell
docker compose ps
```

## 3. 安装依赖与初始化数据库

```powershell
npm install
npx prisma validate
npx prisma generate
npx prisma db push
npm run db:seed
```

首次空数据库可用 `db push` 快速验证。正式生产环境应生成并审查迁移文件，再使用 `prisma migrate deploy`。

## 4. 启动与检查

```powershell
npm run dev
```

浏览器打开 http://localhost:3000 。健康检查： http://localhost:3000/api/health 。

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

## 5. 邮件、OAuth 与图片

- SMTP：填写网易邮箱 SMTP 主机、邮箱地址和独立 SMTP 授权码；不要使用邮箱登录密码。
- Google/GitHub：在各自开发者控制台创建 OAuth 应用，回调地址为 `http://localhost:3000/api/auth/callback/google` 与 `/api/auth/callback/github`。
- OSS/COS/S3：填写 endpoint、bucket、access key、secret 和公开访问基址，并将 bucket CORS 限定为本地站点来源。上传 API 会要求浏览器上传后再调用 complete 校验。
- Live2D：需要自行提供已获授权的模型和 Cubism Core runtime；不配置时保持关闭。

## 故障排查

- `npm install` 失败：检查网络、代理和 npm registry；安装成功前不要尝试 Prisma 或 Next build。
- 数据库连接失败：检查 `.env` 中 DATABASE_URL 的用户名、密码、端口、数据库名；本地进程请用 localhost，不要用 Docker 服务名 db。
- 邮件发送失败：检查 SMTP 授权码、465/SSL 或 587/STARTTLS 设置。
- 图片上传失败：检查 bucket CORS、公开 URL、签名 URL endpoint 与对象存储权限。

不要将 `.env`、数据库备份、用户上传文件或真实密钥提交到 Git。
