import prismadb from "../prismadb";

// This function is used to get all services by user id

export const getServiceById = async (id: string) => {
    try {
        const service = await prismadb.service.findUnique({
            where: {
                id
            }
        });
        return service;
    } catch (error) {
        console.log("[Services_Get]", error);
        return null
    }
}

