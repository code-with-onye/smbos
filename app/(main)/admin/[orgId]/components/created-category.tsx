import Image from "next/image";
import { CreateCategoryCard } from "./create-category-card";
import { ImPlus } from "react-icons/im";

interface categoryProps {
  categories: {
    name: string;
    image: string;
    displayCategory: boolean;
  }[];
}

export const CreatedCategory = ({ categories }: categoryProps) => {
  return (
    <div className="flex flex-col my-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold ">Categories </h3>
        <div className="self-end">
          {/* Create category icon gose here */}
          <CreateCategoryCard
            buttonType={
              <div className="inline-flex items-center text-sm gap-x-1.5">
                Add new category
                <ImPlus className="w-4 h-4 rounded-full text-primary " />
              </div>
            }
          />
        </div>
      </div>

      <div className="flex items-center gap-x-10">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col gap-y-2 items-center mb-4 cursor-pointer drop-shadow-lg "
          >
            {category.image ?  (
              <Image
                src={category.image}
                alt={category.name}
                className="w-12 h-12 rounded-full "
                width={48}
                height={48}
              />
            ): <Image src="https://placehold.co/100x100" alt={category.name} className="w-12 h-12 rounded-full " width={48} height={48}/>}
            <div>
              <h3 className="text-xs font-semibold capitalize">
                {category.name}
              </h3>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
