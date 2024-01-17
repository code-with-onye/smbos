"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

const formSchema = z.object({
  categoryName: z.string().min(1, {
    message: "Category is required",
  }),
  categoryImage: z.string().optional(),
  categoryDescription: z.string().optional(),
  categoryDisplay: z.boolean().optional(),
});

interface Category {
  buttonType: React.ReactNode;
}

export const CreateCategoryCard = ({ buttonType }: Category) => {
  const [isLoading, setisLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  const { mutate: createCategory } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return axios.post("/category", data);
    },
    mutationKey: ["categories"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      categoryImage: "",
      categoryDescription:"",
      categoryDisplay: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setisLoading(true);
    createCategory(values, {
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
    });
  }

  return (
    <Sheet>
      <SheetTrigger>{buttonType}</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Add a new category </SheetTitle>
          <SheetDescription>
            Add a new category. Example is SkinCare
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-12"
          >
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Name of the category. Example is SkinCare
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image  */}

            {/* <FormField
              control={form.control}
              name="categoryImage"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-primary p-4">
                  <FormControl>
                    <FileUpload
                      onUpload={(url) => {
                        if (url) {
                          field.onChange(url);
                          setImage(url);
                        }
                      }}
                      endpoint="categoryImage"
                      
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}

           {/* <div>
             {image && (
               <div className="relative h-40 w-full rounded-lg ">
                 <Image
                   src={image}
                   alt="category image"
                   fill
                   className="object-cover absolute overflow-hidden rounded-lg"
                 />
               </div>
             )}
           </div>  */}

          {/* Description about category */}

            <FormField
              control={form.control}
              name="categoryDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
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
                      Activating this will make the category public
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
            <Button>Submit</Button>
            <SheetClose>
              <div>Close</div>
            </SheetClose>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
