import { NextResponse } from "next/server";import { prisma } from "@/lib/prisma";import { cached } from "@/lib/redis";
export async function GET(){const rows=await cached("announcements:published",60,()=>prisma.announcement.findMany({where:{published:true},orderBy:{publishedAt:"desc"},take:5,select:{id:true,title:true,excerpt:true,coverUrl:true,publishedAt:true}}));return NextResponse.json(rows)}
