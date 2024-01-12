import { verifyJwt } from "@/lib/jwt";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const accessToken = req.headers.get("Authorization");

    if (!accessToken || !verifyJwt(accessToken)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const members = await prismadb.user.findMany();
    return NextResponse.json({
      members,
    });
  } catch (error) {
    console.log("[Members_Get]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
