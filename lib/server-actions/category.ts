import prismadb from "@/lib/prismadb";

export const getCategories = async () => {
   try {
      const categories = await prismadb.category.findMany();
      return categories;
   } catch (error) {
      console.log("[Category_Get]", error);
      return null
   }
}

export const getCategoriesByStoreId = async (id: string) => {

   try {
      const categories = await prismadb.category.findMany({
         where: {
            storeId: id

         },
         include: {
            services: true
         }
      });
      return categories;
   } catch (error) {
      console.log("[Category_Get]", error);
      return null
   }
}

export const getCategoryByUserId = async (id: string) => {

   try {
      const categories = await prismadb.category.findMany({
         where: {
            userId: id
         }
      });
      return categories;
   } catch (error) {
      console.log("[Category_Get]", error);
      return null
   }
}

// get  4 most recent categories By userId by recent date and time created

export const getRecentCategoriesByUserId = async (id: string) => {
   try {
      const categories = await prismadb.category.findMany({
         where: {
            userId: id
         },
         orderBy: {
            createdAt: 'desc'
         },
         take: 4
      });
      return categories;
   } catch (error) {
      console.log("[Category_Get]", error);
      return null
   }
}


