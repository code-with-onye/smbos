"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { FileUpload } from "@/components/shared/file-upload";
import Image from "next/image";
import  { useSheet} from "@/lib/store/sheet-popup";
import { getCategoryById } from "@/lib/server-actions/category";

const formSchema = z.object({
  categoryName: z.string().min(1, {
    message: "Category is required",
  }),
  categoryImage: z.string().optional(),
  categoryDescription: z.string().optional(),
  categoryDisplay: z.boolean().optional(),
  currentStoreId: z.string().optional(),
});

interface Category {
  buttonType?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  edit?: boolean;
}

export const CreateCategory = ({
  buttonType,
  className,
  onClick,
  edit,
}: Category) => {
  const [isLoading, setisLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const {isOpen, onOpen, onClose, id} = useSheet();
  const {storeId} = useParams()
  const router = useRouter();

  
const { mutate: createCategory } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return axios.post("/category", data);
    },
    mutationKey: ["categories"],
  });

  const { mutate: updateCategory } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return axios.post("/category", data);
    },
    mutationKey: ["categories"],
  });

  const { mutate: deleteCategory } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return axios.post("/category", data);
    },
    mutationKey: ["categories"],
  });


  const { data, isLoading: categoryLoading  } = useQuery({
    queryKey: ["categories"],
    queryFn: async() => await getCategoryById({
      id,
      storeId
    } as any),
  })


  console.log(data)
  


  
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      categoryImage: "",
      categoryDescription: "",
      categoryDisplay: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setisLoading(true);

    id
      ? updateCategory(values)
      : createCategory(
          { ...values, currentStoreId: storeId as string },
          {
            onSuccess: (data) => {
              form.reset();
              toast.success("Category created");
              router.refresh();
              setisLoading(false);
            },
            onError: (error: any) => {
              console.log(error);
              setisLoading(false);
              toast.error(error.response.data);
            },
          }
        );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose} >
      <SheetContent side="left" className="w-[600px]">
        <SheetHeader>
          {id ? (
            <SheetTitle>Edit Category</SheetTitle>
          ): (
            <SheetTitle>Create Category</SheetTitle>
          )}
          {
            id ? (
              <SheetDescription>
                Edit the category
              </SheetDescription>
            ) : (
              <SheetDescription>
                Create a new category
              </SheetDescription>
            )
          }
        </SheetHeader>
       
      </SheetContent>
    </Sheet>
  );
};
