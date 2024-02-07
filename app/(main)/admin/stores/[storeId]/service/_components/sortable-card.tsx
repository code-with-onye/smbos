"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useState } from "react";
import { useSheet } from "@/lib/store/sheet-popup";
import { CreateCategory } from "./create-category";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export interface sortableProps {
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
  };
  index?: number;
}

export const SortableCard = ({ categories, index }: sortableProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [active, setActive] = useState("");
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { storeId } = useParams();

  const { onOpen } = useSheet();

  const { mutate: deleteCategory } = useMutation({
    mutationKey: ["categories"],
    mutationFn: (id: string | undefined) => {
      return axios.delete(`/category/${id}`);
    },
  });

  function onDelete(id: string | undefined) {
    setIsDeleting(true);
    deleteCategory(id, {
      onSuccess: () => {
        console.log("success");
        toast.success("Category Deleted Sucessfuly");
        router.refresh();
        router.push(`/admin/stores/${storeId}/service`);
        setIsDeleting(false);
        setDeleting(false);
      },
      onError: (error: any) => {
        console.log(error);
        toast.error(error.response.data);
        setIsDeleting(false);
        setDeleting(false);
      },
    });
  }

  return (
    <>
      <Draggable
        key={categories?.id}
        draggableId={categories?.id}
        index={index || 0}
      >
        {(provided) => (
          <Collapsible
            open={active === categories?.id ? true : false}
            onOpenChange={() =>
              setActive(active === categories?.id ? "" : categories?.id)
            }
            className="w-full space-y-2 border shadow p-3 rounded-lg bg-white"
            key={categories?.id}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            disabled={isDeleting}
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between space-x-4 px-4 cursor-pointer">
                <h4 className="text-lg font-semibold">{categories?.name}</h4>
                <AlertDialog open={deleting} onOpenChange={setDeleting}>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <IoEllipsisVerticalSharp />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link
                          href={`/admin/stores/${categories?.storeId}/category/${categories?.id}`}
                          className="text-blue-500 font-semibold"
                        >
                          Edit Category
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500 font-semibold"
                        onClick={() => setDeleting(true)}
                      >
                        Delete Category
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete all other servvices releated to this catrgory
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          onDelete(categories?.id);
                        }}
                      >
                        Continue
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CollapsibleTrigger>
            {categories?.services.length === 0 ? (
              <p className="text-sm font-semibold text-gray-500 text-center">
                No service created yet
              </p>
            ) : (
              <Link
                href={`/admin/stores/${categories?.storeId}/service/${categories?.services[0].id}`}
              >
                <div className="rounded-md border px-4 py-3 font-mono text-sm shadow-sm ml-12 flex justify-between items-center cursor-pointer hover:bg-slate-100/10">
                  <div className="flex flex-col gap-y-1.5">
                    <h5 className="text-sm font-semibold">
                      {categories?.services[0].name}
                    </h5>
                    <p>{categories?.services[0].duration}</p>
                  </div>
                  <h4 className="font-semibold">
                    NGN {categories?.services[0].price}
                  </h4>
                </div>
              </Link>
            )}

            <CollapsibleContent className="space-y-2 cursor-pointer">
              {/* display service start from 2 go skip the firs one */}
              {categories?.services.slice(1).map((service) => (
                <Link
                  href={`/admin/stores/${categories?.storeId}/service/${service.id}`}
                >
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
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </Draggable>

      <CreateCategory buttonType={""} />
    </>
  );
};
