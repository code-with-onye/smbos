import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      serviceName,
      serviceDescription,
      serviceImage,
      servicePrice,
      serviceFeatured,
      serviceAvailable,
      categoryId,
    } = body;

    const user = await currentUser();

    // validate user

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // validating inputs
    if (!serviceName) {
      return new NextResponse("Missing name", { status: 401 });
    }

    if (!serviceDescription) {
      return new NextResponse("Missing description", { status: 401 });
    }

    if (!servicePrice) {
      return new NextResponse("Missing price", { status: 401 });
    }

    const service = await prismadb.service.create({
      data: {
        name: serviceName,
        description: serviceDescription,
        image: serviceImage,
        price: servicePrice,
        featured: serviceFeatured,
        availability: serviceAvailable,
        userId: user.id as string,
        categoryId: categoryId,
      },
    });

    return NextResponse.json({ service }, { status: 200 });
  } catch (error) {
    console.log("[Service_Post]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
