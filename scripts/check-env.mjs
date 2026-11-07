import { existsSync, readFileSync } from 'node:fs';

const required = ['DATABASE_URL', 'AUTH_SECRET', 'APP_HASH_SECRET'];
if (!existsSync('.env')) {
  console.error('缺少 .env。请先执行：Copy-Item .env.example .env');
  process.exit(1);
}
const env = Object.fromEntries(readFileSync('.env', 'utf8').split(/\r?\n/).filter(x => x.trim() && !x.trim().startsWith('#')).map(line => {
  const i = line.indexOf('=');
  return i < 0 ? [line.trim(), ''] : [line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')];
}));
const missing = required.filter(key => !env[key] || env[key].includes('CHANGE_ME'));
if (missing.length) {
  console.error(`以下配置仍为空或为占位值：${missing.join(', ')}`);
  process.exit(1);
}
if (!env.DATABASE_URL.startsWith('postgresql://')) {
  console.error('DATABASE_URL 必须使用 postgresql://');
  process.exit(1);
}
if (env.AUTH_SECRET === env.APP_HASH_SECRET) {
  console.error('AUTH_SECRET 与 APP_HASH_SECRET 必须使用不同随机值。');
  process.exit(1);
}
console.log('基础环境变量检查通过。请继续检查 SMTP、OAuth 与对象存储配置。');
