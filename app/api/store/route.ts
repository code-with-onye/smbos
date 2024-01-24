import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { storeName, whatsappNumber, storeImage } = body;

    const user = await currentUser();


    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeName) {
      return new NextResponse("Missing store name", { status: 401 });
    }

    if (!whatsappNumber) {
      return new NextResponse("Missing whatsapp number", { status: 401 });
    }

  
    const existingStore = await prismadb.store.findFirst({
      where: {
        name: storeName,
        userId: user?.id as string,

      },
    });

    if (existingStore) {
      return new NextResponse("Store already exists", { status: 401 });
    }

    const store = await prismadb.store.create({
      data: {
        name: storeName,
        userId: user?.id as string,
        whatsappNumber: whatsappNumber,
      },
    });

    return NextResponse.json({
      store,
    });
  } catch (error: any) {
    console.log("[Stores_Post]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const stores = await prismadb.store.findMany();
    return NextResponse.json({
      stores,
    });
  } catch (error) {
    console.log("[Stores_Get]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
