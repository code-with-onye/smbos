import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { orgName, orgSize, serviceType } = body;

        if(!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!orgName) {
            return new NextResponse("Missing Orginization name", { status: 401 });
        }

        if (!orgSize) {
            return new NextResponse("Missing Orginization size", { status: 401 });
        }

        if (!serviceType) {
            return new NextResponse("Missing service type", { status: 401 });
        }

        const existingOrg = await prismadb.orgnization.findFirst({
            where: {
                name: orgName,
                userId: user?.id as string,
            },
        });

        if (existingOrg) {
            return new NextResponse("Orginization already exists", { status: 401 });
        }

        const org = await prismadb.orgnization.create({
            data: {
                name: orgName,
                orgnizationSize: orgSize,
                serviceType: serviceType,
                userId: user?.id as string,
            },
        });
        return NextResponse.json({
            org,
        });


    } catch (error) {
        console.log("[Orgs_Post]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const orgs = await prismadb.orgnization.findMany();
        return NextResponse.json({
            orgs,
        });
    } catch (error) {
        console.log("[Orgs_Get]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}