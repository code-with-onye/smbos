import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  const { storeId } = params;

  try {
    const body = await req.json();

    const {
      date,
      time,
      customerName,
      customerPhone,
      numberOfPeople,
      note,
      serviceId,
    } = body;
    const store = await prismadb.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    if (!serviceId) {
      return new NextResponse("Service not found", { status: 404 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!customerName) {
      return new NextResponse("Missing customer name", { status: 401 });
    }

    if (!customerPhone) {
      return new NextResponse("Missing customer phone", { status: 401 });
    }

    if (!numberOfPeople) {
      return new NextResponse("Missing number of people", { status: 401 });
    }

    if (!date) {
      return new NextResponse("Missing date", { status: 401 });
    }

    if (!time) {
      return new NextResponse("Missing time", { status: 401 });
    }

    const appointment = await prismadb.appointment.create({
      data: {
        date,
        time,
        customerName,
        customerPhone,
        numberOfPeople,
        notes: note,
        serviceId,
        storeId,
        status: "pending",
      },
    })

    return NextResponse.json({
      success: true,
      appointment,
    });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
