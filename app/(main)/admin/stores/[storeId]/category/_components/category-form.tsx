"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { categoryProps } from "@/lib/types";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  categoryName: z.string().min(1, {
    message: "Category is required",
  }),
  categoryImage: z.string().optional(),
  categoryDescription: z.string().optional(),
  categoryDisplay: z.boolean().optional(),
  currentStoreId: z.string().optional(),
});

export const CategoryForm = ({ categories, isEditing }: categoryProps) => {
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter();
  const { storeId } = useParams();

  const { mutate: createCategory } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return axios.post("/category", data);
    },
    mutationKey: ["categories"],
  });

  const { mutate: updateCategory } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return axios.patch(`/category/${categories?.id}`, data);
    },
    mutationKey: ["categories"],
  });

  const { mutate: deleteCategory } = useMutation({
    mutationFn: (id: string | undefined) => {
      return axios.delete(`/category/${id}`);
    },
    mutationKey: ["categories"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: isEditing ? categories?.name : "",
      categoryImage: "",
      categoryDescription: isEditing ? categories?.name : "",
      categoryDisplay: isEditing ? categories?.displayCategory : false,
      currentStoreId: storeId as string,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setisLoading(true);
    
    createCategory(values, {
      onSuccess: (data) => {
        form.reset();
        toast.success("Category created");
        router.push(`/admin/stores/${storeId}/service`);
        router.refresh();
        console.log(data);
        setisLoading(false);
      },
      onError: (error: any) => {
        console.log(error);
        setisLoading(false);
        toast.error(error.response.data);
      },
    });
  }

  function onUpdate(values: z.infer<typeof formSchema>) {
    setisLoading(true);

    updateCategory(values, {
      onSuccess: (data) => {
        form.reset();
        toast.success("Category updated");
        router.push(`/admin/stores/${storeId}/service`);
        router.refresh();
        setisLoading(false);
      },
      onError: (error: any) => {
        console.log(error);
        setisLoading(false);
        router.push(`/admin/stores/${storeId}/service`);
        router.refresh();
        toast.error(error.response.data);
      },
    });
  }

  function onDelete(id: string | undefined) {
    setisLoading(true);
    deleteCategory(id, {
      onSuccess: () => {
        console.log("success");
        toast.success("Category Deleted Sucessfuly");
        router.push(`/admin/stores/${storeId}/service`);
        router.refresh();
        setisLoading(false);
      },
      onError: (error: any) => {
        console.log(error);
        toast.error(error.response.data);
        setisLoading(false);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(isEditing ? onUpdate : onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="categoryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} disabled={isLoading} />
              </FormControl>
              <FormDescription>
                Name of the category. Example is SkinCare
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} disabled={isLoading} />
              </FormControl>
              <FormDescription>
                Description of the category. Example is SkinCare
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryDisplay"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-primary p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Display category Public
                </FormLabel>
                <FormDescription>
                  This category will be displayed on your store
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center w-[20rem] gap-x-4">
          {isEditing ? (
            <div
              className={cn("w-full p-3 rounded-md grid place-items-center bg-primary text-primary-foreground cursor-pointer", {
                "opacity-50 cursor-not-allowed": isLoading,
                "hover:bg-primary": !isLoading,
                "hover:text-white": !isLoading,
              })}
              onClick={() => {
                form.handleSubmit(onUpdate)();
              }}
            >
              Save
            </div>
          ) : (
            <div
              className={cn("w-full p-3 rounded-md grid place-items-center bg-primary text-primary-foreground cursor-pointer", {
                "opacity-50 cursor-not-allowed": isLoading,
                "hover:bg-primary": !isLoading,
                "hover:text-white": !isLoading,
              })}
              onClick={() => {
                form.handleSubmit(onSubmit)();
              }}
            >
              Create
            </div>
          )}

          {isEditing && (
            <div
              className={cn("w-full p-3 rounded-md grid place-items-center bg-destructive text-destructive-foreground cursor-pointer", {
                "opacity-50 cursor-not-allowed": isLoading,
                "hover:bg-destructive": !isLoading,
                "hover:text-white": !isLoading,
              })}
              onClick={() => onDelete(categories?.id)}
            >
              Delete
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};
