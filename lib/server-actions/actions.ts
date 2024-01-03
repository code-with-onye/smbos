import prismadb from "../prismadb";


export const getUserByEmail = async (email: string) => {
    const user = await prismadb.user.findUnique({
        where: {
            email
        }
    })
    return user
}