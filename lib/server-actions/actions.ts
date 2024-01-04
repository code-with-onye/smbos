import prismadb from "../prismadb";

export const getUserByEmail = async (email: string) => {
  const user = await prismadb.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await prismadb.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}