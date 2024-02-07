import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

import { currentUser } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  const user = await currentUser();
  const { serviceId } = params;

  const body = await req.json();
  const {
    serviceName,
    serviceDescription,
    serviceDuration,
    servicePriceType,
    servicePrice,
    serviceFeatured,
    serviceAvailable,
    categoryId
  } = body;

  try {
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serviceId) {
      return new NextResponse("Missing service id", { status: 401 });
    }

    const service = await prismadb.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    if (!service) {
      return new NextResponse("Service not found", { status: 404 });
    }

    const updatedService = await prismadb.service.update({
      where: {
        id: serviceId,
        storeId: service.storeId,
      },
      data: {
        name: serviceName,
        description: serviceDescription,
        duration: serviceDuration,
        priceType: servicePriceType,
        price: servicePrice,
        featured: serviceFeatured,
        availability: serviceAvailable,
        categoryId: categoryId
      },
    });

    return NextResponse.json(updatedService, { status: 200 });
  } catch (error) {
    console.log("[Service_Update]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  const user = await currentUser();
  const { serviceId } = params;
  try {
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serviceId) {
      return new NextResponse("Missing service id", { status: 401 });
    }

    const service = await prismadb.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    if (!service) {
      return new NextResponse("Service not found", { status: 404 });
    }

    await prismadb.service.delete({
      where: {
        id: serviceId,
        storeId: service.storeId,
      },
    });

    return new NextResponse("Service deleted", { status: 200 });
  } catch (error) {
    console.log("[Service_Delete]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
