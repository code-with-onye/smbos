import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await currentUser();
    
    const { categoryName, categoryImage, categoryDisplay } = body;

    if (!categoryName) {
      return new NextResponse("Missing category name", { status: 401 });
    }

    // check if category already exists and user is the owner
    const existingCategory = await prismadb.category.findFirst({
      where: {
        name: categoryName,
        userId: user?.id as string,
      },
    });

    if (existingCategory) {
      return new NextResponse("Category already exists", { status: 401 });
    }

    const category = await prismadb.category.create({
      data: {
        name: categoryName,
        image: categoryImage,
        displayCategory: categoryDisplay,
        userId: user?.id as string,
      },
    });

    return NextResponse.json({
      category,
      status: 200,
    });
  } catch (error) {
    console.log("[Category_Post]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const category = await prismadb.category.findMany();
    return NextResponse.json({
      category,
    });
  } catch (error) {
    console.log("[Category_Get]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}