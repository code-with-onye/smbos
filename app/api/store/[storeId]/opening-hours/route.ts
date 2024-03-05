import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";

import { z } from "zod";
import { OpenHoursSchema } from "@/lib/schemas/open-hours";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = params;
    const body = await req.json();

    const datas = body;

    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const storeOwner = await prismadb.store.findUnique({
      where: {
        userId: user?.id,
        id: storeId,
      },
    });

    if (!storeOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingOpeningHours = await prismadb.openingHours.findMany({
      where: {
        storeId: storeId,
      },
    });

    if (existingOpeningHours.length === 7) {
      await prismadb.openingHours.deleteMany({
        where: {
          storeId: storeId as string,
        },
      });

      await prismadb.openingHours.createMany({
        data: datas.map((data: z.infer<typeof OpenHoursSchema>) => ({
          ...data,
          storeId: storeId as string,
        })),
      });

      return new NextResponse("Opening hours updated", { status: 200 });
    }

    const openingHours = await prismadb.openingHours.createMany({
      data: datas.map((data: z.infer<typeof OpenHoursSchema>) => ({
        ...data,
        storeId: storeId as string,
      })),
    });

    return NextResponse.json({ openingHours }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
