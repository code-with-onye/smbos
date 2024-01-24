import { ViewService } from "@/components/shared/view-service";
import Image from "next/image";
import React from "react";

interface serviceProps {
  services: {
    name: string;
    description: string;
    price: string;
    image: string;
    userId: string;
    categoryId: string;

    availability: Boolean;
    featured: Boolean;
  }[];
}

type ServiceCardProps = {
  image: string;
  name: string;
  description: string;
  price:string
};

const ServiceCard = ({
  image = "https://placehold.co/400x400",
  name,
  description,
  price
}: ServiceCardProps) => {
  return (
    <ViewService
      name={name}
      description={description}
      price={price}
      image={image}
      userId={""}
      categoryId={""}
      availability={false}
      featured={false}
    >
      <div className="flex flex-col items-start  border dark:border-black shadow-md p-3 rounded-lg cursor-pointer">
        <div className="relative w-full h-60">
          <Image
            src={image}
            alt={name}
            className="rounded-lg border dark:border-black"
            fill
          />
        </div>
        <h4 className="text-lg font-semibold mt-3">{name}</h4>
        <p className="text-sm">{description}</p>
      </div>
    </ViewService>
  );
};
export const CreatedService = ({ services }: serviceProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {services.map((service) => (
        <ServiceCard
          key={service.name}
          image={service.image}
          name={service.name}
          description={service.description}
          price={service.price} 
        />
      ))}
    </div>
  );
};
