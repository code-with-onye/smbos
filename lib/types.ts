export type CategoriesNamesAndIdProps = {
  categories: {
    name: string;
    id: string;
  }[] | undefined;
}


export type CategoriesByStoreIdProps = {

  categories: {
    services: {
      id: string;
      name: string;
      duration: string;
      price: string;
      
    }[];
    id: string;
    name: string;
    image: string;
    displayCategory: boolean;
    storeId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }[] | null
}
