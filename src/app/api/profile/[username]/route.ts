import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/auth-helpers";
import { jsonError, safeUrl } from "@/lib/http";

type RouteContext = { params: Promise<{ username: string }> };

async function findProfile(usernameParam: string) {
  let decoded = usernameParam;
  try {
    decoded = decodeURIComponent(usernameParam);
  } catch {
    // Keep the original route parameter when it contains malformed percent escapes.
  }
  const username = decoded.replace(/^@/, "").trim().toLowerCase();
  if (!username) return null;

  const select = {
    id: true,
    username: true,
    nickname: true,
    image: true,
    bio: true,
    businessCard: true,
    createdAt: true,
    profileColor: true,
    contactLinks: true,
    roomsCreated: { select: { id: true, name: true, category: true } },
    roomMemberships: { include: { room: { select: { id: true, name: true, category: true } } } },
    moments: {
      where: { status: "PUBLISHED" as const, visibility: "PUBLIC" as const },
      orderBy: { createdAt: "desc" as const },
      take: 20,
      select: { id: true, content: true, createdAt: true, _count: { select: { likes: true, comments: true } } },
    },
    notes: {
      where: { status: "PUBLISHED" as const, visibility: "PUBLIC" as const },
      orderBy: { updatedAt: "desc" as const },
      take: 20,
      select: { id: true, slug: true, title: true, excerpt: true, updatedAt: true },
    },
  };

  return prisma.user.findFirst({
    where: { username: { equals: username, mode: "insensitive" } },
    select,
  });
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { username } = await params;
  const user = await findProfile(username);
  if (!user) return jsonError("用户不存在", 404);

  const [likes, likers] = await Promise.all([
    prisma.profileLike.count({ where: { targetId: user.id } }),
    prisma.profileLike.findMany({
      where: { targetId: user.id },
      orderBy: { createdAt: "desc" },
      take: 30,
      include: { actor: { select: { username: true, nickname: true, image: true } } },
    }),
  ]);

  return NextResponse.json({ ...user, likes, likers });
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const user = await currentUser();
  if (!user) return jsonError("请先登录", 401);

  const { username } = await params;
  const target = await findProfile(username);
  if (!target) return jsonError("用户不存在", 404);
  if (user.id !== target.id && user.role !== "ADMIN") return jsonError("无权修改", 403);

  const data = await request.json();
  const updated = await prisma.user.update({
    where: { id: target.id },
    data: {
      nickname: typeof data.nickname === "string" ? data.nickname.trim().slice(0, 48) : undefined,
      bio: typeof data.bio === "string" ? data.bio.slice(0, 500) : undefined,
      businessCard: typeof data.businessCard === "string" ? data.businessCard.slice(0, 500) : undefined,
      image: typeof data.image === "string" ? safeUrl(data.image) || (data.image.startsWith("/api/assets/") ? data.image : undefined) : undefined,
      profileColor: typeof data.profileColor === "string" ? data.profileColor.slice(0, 32) : undefined,
      contactLinks: typeof data.contactLinks === "string" ? data.contactLinks.slice(0, 2000) : undefined,
      locale: ["zh-CN", "en"].includes(data.locale) ? data.locale : undefined,
      theme: ["dark", "light"].includes(data.theme) ? data.theme : undefined,
    },
  });
  return NextResponse.json(updated);
}
