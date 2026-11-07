import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const userAgent = req.headers.get("user-agent") || "";
  const dayKey = new Date().toISOString().slice(0, 10);
  const visitorHash = createHash("sha256")
    .update(`${ip}:${userAgent}:${process.env.APP_HASH_SECRET || "local-development"}`)
    .digest("hex");

  try {
    // The compound unique key makes repeated visits idempotent for this visitor/day.
    await prisma.viewDaily.upsert({
      where: {
        contentType_contentId_dayKey_visitorHash: {
          contentType: "site",
          contentId: "home",
          dayKey,
          visitorHash,
        },
      },
      create: {
        contentType: "site",
        contentId: "home",
        dayKey,
        visitorHash,
      },
      update: {},
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/visit] Failed to record daily view:", error);
    return NextResponse.json({ ok: false, error: "无法记录访问统计" }, { status: 500 });
  }
}
