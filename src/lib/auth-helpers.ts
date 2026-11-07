import { auth } from "../../auth";
import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/http";
import { NextResponse } from "next/server";
export async function currentUser() { const session = await auth(); const id = (session?.user as { id?: string } | undefined)?.id; if (!id) return null; return prisma.user.findUnique({ where: { id }, select: { id: true, username: true, nickname: true, email: true, image: true, role: true, disabledAt: true, deletedAt: true } }); }
export async function requireUser() { const user = await currentUser(); if (!user || user.disabledAt || user.deletedAt) return { user: null, response: jsonError("请先登录", 401) }; return { user, response: null }; }
export async function requireAdmin() { const result = await requireUser(); if (!result.user) return result; if (result.user.role !== "ADMIN") return { user: null, response: NextResponse.json({ error: "无权访问" }, { status: 403 }) }; return result; }
