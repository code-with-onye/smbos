import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/lib/server-actions/actions";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password, businessName } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    const createUser = await prismadb.user.create({
      data: {
        email,
        password: hashedPassword,
        businessName
        
      },
    });
    // TODO: Send verification email

    return NextResponse.json({
      createUser,
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
