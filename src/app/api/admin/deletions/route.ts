import { NextResponse } from "next/server"; import { prisma } from "@/lib/prisma"; import { requireAdmin } from "@/lib/auth-helpers";
export async function GET(){const {response}=await requireAdmin();if(response)return response;return NextResponse.json(await prisma.deletionRequest.findMany({where:{status:"PENDING"},orderBy:{createdAt:"asc"}}))}
