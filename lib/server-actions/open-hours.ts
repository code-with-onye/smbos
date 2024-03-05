import prismadb from "../prismadb";


export const getOpenHoursByStoreId = async (id: string) => {
    try {
        const openHours = await prismadb.openingHours.findMany({
            where: {
                storeId: id
            }
        });
        return openHours;
    } catch (error) {
        console.log("[OpenHours_Get]", error);
        return null
    }
}