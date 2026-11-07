import { NextResponse } from "next/server";import { currentUser } from "@/lib/auth-helpers";
export async function GET(){const user=await currentUser();if(!user)return NextResponse.json({user:null});return NextResponse.json({user})}
