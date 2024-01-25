"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CategoriesByStoreIdProps } from "@/lib/types";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export const CreatedService = ({ categories }: CategoriesByStoreIdProps) => {
  console.log(categories);
  const [active, setActive] = useState("");
  return (
    <div>
      {/* created service header */}

      {/* created service body */}
      <div className="w-full flex flex-col gap-y-4">
        {categories?.map((category) => (
          <Collapsible
            open={active === category.id ? true : false}
            onOpenChange={() => setActive(category.id)}
            className="w-full space-y-2 border shadow p-3 rounded-lg bg-white"
            key={category.id}
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between space-x-4 px-4 cursor-pointer">
                <h4 className="text-lg font-semibold">{category.name}</h4>
                <Button variant="ghost" size="sm">
                  <CaretDownIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </div>
            </CollapsibleTrigger>
            {category.services.length === 0 ? (
              <p className="text-sm font-semibold text-gray-500 text-center">
                No service created yet
              </p>
            ) : (
              <div className="rounded-md border px-4 py-3 font-mono text-sm shadow-sm ml-12 flex justify-between items-center cursor-pointer hover:bg-slate-100/10">
                <div className="flex flex-col gap-y-1.5">
                  <h5 className="text-sm font-semibold">
                    {category.services[0].name}
                  </h5>
                  <p>{category.services[0].duration}</p>
                </div>
                <h4 className="font-semibold">
                  NGN {category.services[0].price}
                </h4>
              </div>
            )}
            <CollapsibleContent className="space-y-2 cursor-pointer">
              {/* display service start from 2 go skip the firs one */}
              {category.services.slice(1).map((service) => (
                <div
                  className="rounded-md border px-4 py-3 font-mono text-sm shadow-sm ml-12 flex justify-between items-center cursor-pointer hover:bg-slate-100/10"
                  key={service.id}
                >
                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm font-semibold">{service.name}</h5>
                    <p>{service.duration}</p>
                  </div>
                  <h4 className="font-semibold">NGN {service.price}</h4>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};
