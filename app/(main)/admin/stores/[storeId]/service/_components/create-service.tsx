"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";

import axios from "@/lib/axios";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FileUpload } from "@/components/shared/file-upload";
import Image from "next/image";

const durations = ["5min", "10min", "15min", "20min"];

const formSchema = z.object({
  categoryId: z.string({
    required_error: "Choose a category",
  }),
  storeId: z.string(),
  serviceName: z.string().min(3, {
    message: "Category is required",
  }),
  serviceDescription: z
    .string().optional(),
  // serviceImage: z.string({
  //   required_error: "Image is required",
  //   invalid_type_error: "Image must be a string",
  // }),

  servicePrice: z.string({
    required_error: "Price is required",
  }),
  serviceDuration: z.string({
    required_error: "Duration is required",
  }),

  servicePriceType: z.string({
    required_error: "Price type is required",
  }),

  serviceFeatured: z.boolean().optional(),
  serviceAvailable: z.boolean().optional(),
});

interface Service {
  buttonType: React.ReactNode;
  className?: string;
  onClick?: () => void;

  categories: {
    id: string;
    name: string;
  }[] | undefined;
}

export const CreateService = ({
  buttonType,
  categories,
  className,
  onClick,
}: Service) => {
  const [isLoading, setisLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const { storeId } = useParams()


  const { mutate: createService } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return axios.post("/service", data);
    },
    mutationKey: ["categories"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "" || categories?.[0]?.id,
      serviceName: "",
      storeId:  storeId as string,
      serviceDescription: "",
      servicePrice: "",
      serviceDuration: "",
      servicePriceType: "",
      serviceFeatured: false,
      serviceAvailable: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setisLoading(true);

    console.log(values)
    createService(values, {
      onSuccess: (data) => {
        form.reset();
        toast.success("Category created");
        // router.refresh()
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

  return (
    <Sheet>
      <SheetTrigger className={className} onClick={onClick}>
        {buttonType}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-screen overflow-y-auto ">
        <SheetHeader>
          <SheetTitle> Create Service </SheetTitle>
          <SheetDescription>Add a new service</SheetDescription>
        </SheetHeader>
        <div className="px-[20rem]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-12"
            >
              <div className="w-full border-2 border-gray-900 shadow rounded-md p-4">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold">Basic Info</h3>
                  <p className="text-sm">
                    Add a service name and choose the service type
                  </p>
                </div>
                <div className="w-full mt-4">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Choose a Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue className=" capitalize" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories?.map((category) => (
                              <SelectItem 
                                key={category.id}
                                value={category.id}
                                className=" capitalize"
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select a category you want add a service to
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the name of the service
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={`Talk a little bit about your service`}
                            className="resize-none"
                            rows={10}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-full border-2 border-gray-900 shadow rounded-md p-4 flex flex-col gap-y-2">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold">Price Durationn</h3>
                  <p className="text-sm">
                    Add the pricing options and duration of the service.
                  </p>
                </div>
                <div className="w-full mt-4 boder bg-[#F5F5F5] p-3 rounded-md">
                  <h3 className="text-lg font-semibold">Pricing Option 1</h3>
                  <div className="flex flex-row w-full   gap-x-4">
                    <FormField
                      control={form.control}
                      name="serviceDuration"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel> Duration</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl className="bg-white">
                              <SelectTrigger>
                                <SelectValue className=" capitalize" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* time  */}
                              {durations.map((duration, i) => (
                                <SelectItem key={i} value={duration}>
                                  {" "}
                                  {duration}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="servicePriceType"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel> Price type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl className="w-full bg-white">
                              <SelectTrigger>
                                <SelectValue className=" capitalize" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="free">Free</SelectItem>
                              <SelectItem value="from">From</SelectItem>
                              <SelectItem value="fixed">Fixed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="servicePrice"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Service Price</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Price"
                              {...field}
                              className="bg-white"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div
                  className=" w-full bg-primary cursor-pointer text-primary-foreground p-3 rounded-md grid place-items-center"
                  onClick={() => {
                    console.log("add pricing option");
                  }}
                >
                  Add Pricing Option
                </div>
              </div>

              <div className="w-full border-2 border-gray-900 shadow rounded-md p-4">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold">Display Service</h3>
                  <p className="text-sm">Showcase your to your online store</p>
                </div>
                <div className="flex flex-col gap-y-3 items-start   rounded-lg border border-primary p-4 mt-4">
                  <FormField
                    control={form.control}
                    name="serviceAvailable"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-x-4 w-full">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Available</FormLabel>
                          <FormDescription>
                            Turn this OFF to hide the service from your store
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between w-full">
                <Button>Submit</Button>
                <SheetClose>Cancel</SheetClose>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
