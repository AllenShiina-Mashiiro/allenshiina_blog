import { NextResponse } from "next/server";
export function jsonError(message: string, status = 400) { return NextResponse.json({ error: message }, { status }); }
export function getString(value: unknown, max = 5000) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
export function safeUrl(value: string) { try { const u = new URL(value); return ["https:", "http:"].includes(u.protocol) ? u.toString() : null; } catch { return null; } }
