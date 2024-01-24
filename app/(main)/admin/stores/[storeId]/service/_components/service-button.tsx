"use client";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CreateCategoryCard } from "../../../components/create-category-card";
import { CreateService } from "../../../components/create-service";

export const ServiceButton = () => {
  const [active, setActive] = useState("");
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="w-[14rem]">Add New</Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-y-2">
        <CreateCategoryCard
          buttonType="New Category"
          className={cn(
            active === "category"
              ? "bg-primary/40 text-primary-foreground p-3 rounded-lg"
              : ""
          )}
          onClick={() => setActive("category")}
        />
        <CreateService
          buttonType="New Service"
          categories={[]}
          className={cn(
            active === "service"
              ? "bg-primary text-primary-foreground p-3 rounded-lg"
              : ""
          )}
          onClick={() => setActive("service")}
        />
      </PopoverContent>
    </Popover>
  );
};
