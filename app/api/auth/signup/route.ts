import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, dob, address, blood, family, insurance, weight, height, signed } = await req.json();
    const user = prisma.user.create({
        data:{
        email:'bob@bob.com',
        password:'bobbb',
        dob:dob,
        address:address,
        blood:blood,
        family:family,
        insurance:insurance,
        weight:weight,
        height:height,
        signed:true
        }
    });
    return NextResponse.json(user);
  }
