import Image from "next/image";
import React from "react";

interface serviceProps {
  services: {
    name: String;
    description: String;
    price: String;
    image: String;
    userId: String;
    categoryId: String;

    availability: Boolean;
    featured: Boolean;
  }[];
}

type ServiceCardProps = {
    image: String;
    name: String;
    description: String;
}

const ServiceCard = ({ image="https://placehold.co/400x400", name, description }: ServiceCardProps) => {
  return (
    <div className="flex flex-col gap-y-1 items-start  border dark:border-black shadow-md p-3 rounded-lg">
      <div className="relative w-full h-60">
      <Image src={image} alt={name} className="rounded-lg border dark:border-black" fill/>
      </div>
      <h4 className="text-lg font-semibold">{name}</h4>
      <p className="text-sm">{description}</p>
    </div>
  );
};
export const CreatedService = ({ services }: serviceProps) => {
  return <div className="grid grid-cols-2 gap-4">
    {
      services.map((service) => (
        <ServiceCard
          key={service.name}
          image={service.image}
          name={service.name}
          description={service.description}
        />
      ))
    }
  </div>;
};
