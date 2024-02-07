import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string; categoryId: string } }
) {
    try {
        const user = await currentUser();
        const { storeId, categoryId } = params;
        

        const storeOwner = await prismadb.store.findUnique({
            where: {
                userId: user?.id,
                id: storeId,
            },
        });

        if (!storeOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const category = await prismadb.category.findFirst({
            where: {
                id: categoryId,
                storeId: storeId,
            },
        });

        return NextResponse.json({
            category,
        });

    } catch (error) {
        console.log("[Category_Get]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}  