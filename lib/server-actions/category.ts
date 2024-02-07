import prismadb from "@/lib/prismadb";
import axios from "../axios";

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


export const getCategoryById = async (id: string)=> {

   try {
      const category = await prismadb.category.findUnique({
         where: {
            id
         }
      });
      return category;
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


