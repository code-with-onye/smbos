import prismadb from "../prismadb";

export const getOrgsByUserId = async (id: string) => {
    try {
        const orgs = await prismadb.orgnization.findMany({
            where: {
                userId: id
            }
        });
        return orgs;
    } catch (error) {
        console.log("[Org_Get]", error);
        return null
    }
}


export const getOrgs = async () => {
    try {
        const orgs = await prismadb.orgnization.findMany();
        return orgs;
    } catch (error) {
        console.log("[Org_Get]", error);
        return null
    }
}

