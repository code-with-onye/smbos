import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const user = await currentUser();
    const body = await req.json();
    const { categories } = body;


    for (const category of categories) {
      const { id, name } = category;
      await prismadb.category.update({
        where: {
          id,
        },
        data: {
          name: name,
        },
      }); 
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return new NextResponse("success", { status: 200 });
  } catch (error) {
    console.log("[Category_Reorder]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
