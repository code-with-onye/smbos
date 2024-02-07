"use client";
import { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { SortableCard } from "./sortable-card";

import { updateService } from "@/lib/server-actions/update-service";
import { CategoriesByStoreIdProps } from "@/lib/types";
export const CreatedService = ({ categories }: CategoriesByStoreIdProps) => {
  const [currentCatgories, setcurrentCatgories] = useState(categories || []);
  const router = useRouter();

  const { mutate: updateCategories } = useMutation({
    mutationFn: updateService,
    mutationKey: ["services"],
  });

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  const onDragEnd = (event: any) => {
    const { destination, source, type } = event;

    if (!destination) return;

    // if droped in thesame position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    //if user move a category
    if (type === "category") {
      const newCategories = reorder(
        currentCatgories,
        source.index,
        destination.index
      ).map((category, index) => {
        return {
          ...category,
          displayOrder: index,
        };
      });
      setcurrentCatgories(newCategories);

      updateCategories(
        {
          categories: newCategories,
        },
        {
          onSuccess: () => {
            router.refresh();
            toast.success("Categories reordered");
          },
          onError: (error: any) => {
            console.log(error);
          },
        }
      );

      // TODO Server actions
    }
  };

  return (
    <div className="h-[90vh] overflow-y-auto flex flex-col py-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable direction="vertical" type="category" droppableId="droppable">
          {(provider) => (
            <div
              {...provider.droppableProps}
              ref={provider.innerRef}
              className="w-full flex flex-col gap-y-4"
            >
              {currentCatgories?.map((category, index) => (
                <SortableCard
                  key={category.id}
                  categories={category}
                  index={index}
                />
              ))}
              {provider.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
