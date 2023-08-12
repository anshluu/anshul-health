import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, dob, address, blood, family, insurance, weight, height, signed } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
        //@ts-ignore
        dob,
        address,
        blood,
        family,
        insurance,
        weight,
        height,
        signed
      },
    });
    return NextResponse.json(user);
  }
}
