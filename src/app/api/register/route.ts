import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomInt, createHash } from "node:crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { allowRate } from "@/lib/redis";
import { validateUsername } from "@/lib/username";
import { getString, jsonError } from "@/lib/http";
const schema = z.object({ email: z.string().email().max(254), purpose: z.enum(["register","reset"]).default("register") });
export async function POST(req: NextRequest) { try { const data = schema.parse(await req.json()); const email = data.email.toLowerCase(); if (!(await allowRate(`mail:${req.headers.get("x-forwarded-for") || "unknown"}:${email}`, 4, 3600))) return jsonError("请求过于频繁，请稍后再试",429); const existing = await prisma.user.findUnique({ where: { email } }); if (data.purpose === "register" && existing) return jsonError("该邮箱已注册"); if (data.purpose === "reset" && !existing) return NextResponse.json({ ok: true }); const code = String(randomInt(0, 1_000_000)).padStart(6,"0"); const codeHash = createHash("sha256").update(`${code}:${process.env.APP_HASH_SECRET || process.env.AUTH_SECRET}`).digest("hex"); await prisma.emailCode.create({ data: { email, purpose: data.purpose, codeHash, expiresAt: new Date(Date.now()+10*60_000) } }); await sendMail(email, data.purpose === "register" ? "AllenShiina 注册验证码" : "AllenShiina 密码重置验证码", `<div style="font-family:sans-serif"><h2>AllenShiina</h2><p>你的验证码：</p><strong style="font-size:32px;letter-spacing:8px">${code}</strong><p>验证码 10 分钟内有效，请勿向他人透露。</p></div>`); return NextResponse.json({ ok:true, expiresIn:600 }); } catch(e) { return jsonError(e instanceof Error ? e.message : "发送失败",500); } }
