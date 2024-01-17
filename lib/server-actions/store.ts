import prismadb from "../prismadb";


export const getStores = async () => {
    try {
        const stores = await prismadb.store.findMany();
        return stores;
    } catch (error) {
        console.log("[Store_Get]", error);
        return null
    }
}

export const getStoresByOgnId = async (id: string) => {
    try {
        const stores = await prismadb.store.findMany({
            where: {
                orgId: id
            }
        });
        return stores;
    } catch (error) {
        console.log("[Store_Get]", error);
        return null
    }
}