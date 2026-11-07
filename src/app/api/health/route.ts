import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, "ok" | "error" | "not-configured"> = {
    database: "error",
    redis: process.env.REDIS_URL ? "error" : "not-configured",
    smtp: process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD ? "ok" : "not-configured",
    objectStorage: process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY ? "ok" : "not-configured",
  };
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = "ok";
  } catch {
    checks.database = "error";
  }
  const client = redis();
  if (client) {
    try {
      await client.ping();
      checks.redis = "ok";
    } catch {
      checks.redis = "error";
    }
  }
  const healthy = checks.database === "ok";
  return NextResponse.json({ status: healthy ? "ok" : "degraded", checks, timestamp: new Date().toISOString() }, { status: healthy ? 200 : 503, headers: { "Cache-Control": "no-store" } });
}
