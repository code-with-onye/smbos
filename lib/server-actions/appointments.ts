import prismadb from "../prismadb";

export const getAppointmentsByStoreId = async (id: string) => {
    try {
        const appointments = await prismadb.appointment.findMany({
            where: {
                storeId: id
            },
            include: {
                service: true
            }
        });
        return appointments;
    } catch (error) {
        console.log("[Appointments_Get]", error);
        return null
    }
}


