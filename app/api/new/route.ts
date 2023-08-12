import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { addeddate, newweight, patemail } = await req.json();
  const finalpatemail = patemail.replace('%40', '@') 
  const res = await prisma.user.findFirst({
    where: { email:finalpatemail},
    select: {
      weight: true,
      //@ts-ignore
      wdate:true
    },
  })
  const date = new Date()
 await prisma.user.update({
    where:{email:finalpatemail},
    data:{
        weight: {
            //@ts-ignore
            set: [...res.weight, (`${newweight}ID`)],
          },
          wdate: {
            //@ts-ignore
            set: [...res.wdate, (`${addeddate}ID`)],
          },
    }
 })
 return NextResponse.json(200);
  }

