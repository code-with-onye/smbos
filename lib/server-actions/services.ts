import prismadb from "../prismadb";

// This function is used to get all services by user id
export const getServicesByUserId = async (id: string) => {
    try {
        const services = await prismadb.service.findMany({
            where: {
                userId: id
            }
        });
        return services;
    } catch (error) {
        console.log("[Services_Get]", error);
        return null
    }
}

// This function is used to get all recently created services by user id
export const getRecentlyCreatedServicesByUserId = async (id: string) => {
    try {
        const services = await prismadb.service.findMany({
            where: {
                userId: id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return services;
    } catch (error) {
        console.log("[Services_Get]", error);
        return null
    }
}

// This function is used to get all services by user id and category
export const getServicesByUserIdAndCategory = async (id: string, categoryId: string) => {
    try {
        const services = await prismadb.service.findMany({
            where: {
                userId: id,
                categoryId
            }
        });
        return services;
    } catch (error) {
        console.log("[Services_Get]", error);
        return null
    }
}



