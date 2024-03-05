export type CategoriesNamesAndIdProps = {
  categories:
    | {
        name: string;
        id: string;
      }[]
    | undefined;
  isEditing?: boolean;
  serviceId?: string;
};

export type CategoriesByStoreIdProps = {
  categories:
    | {
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
      }[]
    | null;
  isEditing?: boolean;
  serviceId?: string;
};

export type categoryProps = {
  categories?: {
    id: string;
    name: string;
    image: string;
    displayCategory: boolean;
    storeId: string;
    userId: string;
  } | null;
  categoryId?: string;
  isEditing?: boolean;
};

export type serviceProps = {
  service: {
    id: string;
    name: string;
    description: string;
    price: string;
    duration: string;
    priceType: string;
    storeId: string;
    categoryId: string;
    availability: boolean;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

export type AppointmentProps = {
      id: string;
      date: Date;
      time: string;
      status: string;
      customerName: string;
      customerPhone: string;
      notes: string;
      numberOfPeople: string;
      serviceId: string;
    }
