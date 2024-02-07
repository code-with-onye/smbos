"use client";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CreateService } from "./create-service";
import { CategoriesNamesAndIdProps } from "@/lib/types";
import { useSheet } from "@/lib/store/sheet-popup";
import Link from "next/link";
import { useParams } from "next/navigation";

export const ServiceButton = ({ categories }: CategoriesNamesAndIdProps) => {
  const { storeId } = useParams();
  const [active, setActive] = useState("");

  return (
    <Popover>
      <PopoverTrigger>
        <Button className="w-[14rem]">Add New</Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-y-2">
        <Button
          variant="ghost"
          className={cn(
            active === "category"
              ? "bg-primary text-primary-foreground p-3 rounded-lg "
              : ""
          )}
        >
          <Link href={`/admin/stores/${storeId}/category/new`} className="">
            New Category
          </Link>
        </Button>

        <Button variant="ghost" className={cn(active === "service" ? "bg-primary text-primary-foreground p-3 rounded-lg " : "")}>
          <Link href={`/admin/stores/${storeId}/service/new`}>New Service</Link>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
