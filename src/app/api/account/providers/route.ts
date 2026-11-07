import { NextResponse } from "next/server";import { prisma } from "@/lib/prisma";import { currentUser } from "@/lib/auth-helpers";import { jsonError } from "@/lib/http";
export async function GET(){const u=await currentUser();if(!u)return jsonError("请先登录",401);return NextResponse.json(await prisma.account.findMany({where:{userId:u.id},select:{provider:true,providerAccountId:true}}))}
