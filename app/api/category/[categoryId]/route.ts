import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { Category } from "@prisma/client";
import { revalidatePath } from 'next/cache';


export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const user = await currentUser();
  const { categoryId } = params;
  const body = await req.json();

  const { categoryName, categoryDisplay } = body;

  try {
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse("Missing category id", { status: 401 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    if (category.userId !== user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedCategory = await prismadb.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: categoryName,
        displayCategory: categoryDisplay,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log("[Category_Update]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const user = await currentUser();
  const { categoryId } = params;
  try {
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse("Missing category id", { status: 401 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    if (category.userId !== user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prismadb.category.delete({
      where: {
        id: categoryId,
      },
    });

    return new NextResponse("Category deleted", { status: 200 });
  } catch (error) {
    console.log("[Category_Delete]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
