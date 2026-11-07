import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
async function main(){const days=Math.max(1,Number(process.env.CHAT_RETENTION_DAYS||180));const result=await prisma.chatMessage.deleteMany({where:{createdAt:{lt:new Date(Date.now()-days*86400_000)}}});console.log(`Deleted ${result.count} chat messages older than ${days} days.`)}
main().finally(()=>prisma.$disconnect());
