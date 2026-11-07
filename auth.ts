import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { validateUsername } from "@/lib/username";

const providers: Provider[] = [];
if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) providers.push(Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET, profile(p) { const base = String(p.email || p.sub).split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 24) || `google_${String(p.sub).slice(-8)}`; return { id: p.sub, name: p.name, email: p.email, image: p.picture, username: base, nickname: p.name || base }; } }) as Provider);
if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) providers.push(GitHub({ clientId: process.env.AUTH_GITHUB_ID, clientSecret: process.env.AUTH_GITHUB_SECRET, profile(p) { const base = String(p.login || `github_${p.id}`).toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 24); return { id: String(p.id), name: p.name || p.login, email: p.email, image: p.avatar_url, username: base, nickname: p.name || p.login }; } }) as Provider);
providers.push(Credentials({ id: "credentials", name: "邮箱与密码", credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } }, async authorize(credentials) { const email = String(credentials?.email || "").toLowerCase().trim(); const password = String(credentials?.password || ""); if (!email || !password) return null; const user = await prisma.user.findUnique({ where: { email } }); if (!user?.passwordHash || !user.emailVerified || user.disabledAt || user.deletedAt) return null; if (!(await bcrypt.compare(password, user.passwordHash))) return null; return { id: user.id, email: user.email, name: user.nickname, image: user.image, username: user.username, role: user.role }; } }));

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma), providers, session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ user }) { if (user.email && process.env.ADMIN_EMAIL && user.email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase()) { await prisma.user.updateMany({ where: { email: user.email }, data: { role: "ADMIN" } }); } return true; },
    async jwt({ token, user }) { if (user?.id) { token.uid = user.id; token.username = (user as typeof user & { username?: string }).username; token.role = (user as typeof user & { role?: string }).role; } if (token.uid) { const found = await prisma.user.findUnique({ where: { id: String(token.uid) }, select: { username: true, role: true, disabledAt: true, deletedAt: true, authVersion: true } }); if (!found || found.disabledAt || found.deletedAt || (token.authVersion !== undefined && token.authVersion !== found.authVersion)) return {}; token.username = found.username; token.role = found.role; token.authVersion = found.authVersion; } return token; },
    async session({ session, token }) { if (session.user) Object.assign(session.user, { id: token.uid, username: token.username, role: token.role }); return session; }
  }
});
