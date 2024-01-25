import { CategoriesNamesAndIdProps } from "@/lib/types";
import { ServiceButton } from "./service-button";
export const ServiceHeader = ({ categories }: CategoriesNamesAndIdProps) => {
  return (
    <div className="flex items-center justify-between w-full my-4">
      <h3>Service Menus</h3>
      <ServiceButton categories={categories} />
    </div>
  );
};
