"use server";
import { currentUser } from "../../auth";
import prismadb from "../../prismadb";
import { revalidatePath } from 'next/cache';

const hanndler = async (data: any): Promise<any> => {
    const user = await currentUser();
    
    const { categories } = data;

    let newCategories;

    try {
        
    for (const category of categories) {
        const { id, name } = category;
       newCategories = await prismadb.category.update({
          where: {
            id,
          },
          data: {
            name: name,
          },
        });
      }
    } catch (error) {
        return {
            error: "Failed to update.",
        };
    }

    return {
        categories: newCategories,
    };

};

export const updateService = hanndler;