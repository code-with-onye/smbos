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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import React, { useState } from "react";

const formSchema = z.object({
    categoryId: z.string({
        required_error: "Choose a category",
    }),
    serviceName: z.string().min(3, {
        message: "Category is required",
    }),
    serviceDescription: z
        .string()
        .min(10, {
            message: "Description must be at least 10 characters.",
        })
        .max(160, {
            message: "Description must not be longer than 30 characters.",
        }),
    serviceImage: z.string({
        required_error: "Image is required",
        invalid_type_error: "Image must be a string",
    }),

    servicePrice: z.string({
        required_error: "Price is required",
    }),
    serviceFeatured: z.boolean().optional(),
    serviceAvailable: z.boolean().optional(),
});

interface Service {
    buttonType: React.ReactNode;

    categories: {
        id: string;
        name: string;
        image: string;
        displayCategory: boolean;
    }[];
}

export const CreateService = ({ buttonType, categories }: Service) => {
    const [isLoading, setisLoading] = useState(false);
    const router = useRouter();

      const { mutate: createService } = useMutation({
        mutationFn: (data: z.infer<typeof formSchema>) => {
          return axios.post("/service", data);
        },
        mutationKey: ["categories"],
      });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: "" || categories[0]?.id ,
            serviceName: "",
            serviceDescription: "",
            serviceImage: "",
            servicePrice: "",
            serviceFeatured: false,
            serviceAvailable: false,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setisLoading(true)
        createService(values, {
          onSuccess: (data) => {
            form.reset()
            toast.success("Category created")
            // router.refresh()
            console.log(data)
            setisLoading(false)
          },
          onError: (error:any) => {
            console.log(error)
            setisLoading(false)
            toast.error(error.response.data)
          }
        })
    }

    return (
        <Sheet>
            <SheetTrigger>{buttonType}</SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle> Create Service </SheetTitle>
                    <SheetDescription>Add a new service</SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-12"
                    >
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
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id} className=" capitalize">
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>Select a category you want add a service to</FormDescription>
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
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={`Talk a little bit about your service`}
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="servicePrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Service Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Price" {...field}  />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the amount you customers to pay for the service
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-y-3 items-center justify-between rounded-lg border border-primary p-4">
                            <FormField
                                control={form.control}
                                name="serviceAvailable"
                                render={({ field }) => (
                                    <FormItem  className="flex items-center gap-x-2">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Available
                                            </FormLabel>
                                            <FormDescription>
                                                Turn this ON to show Service in your Online page
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

                            <FormField
                                control={form.control}
                                name="serviceFeatured"
                                render={({ field }) => (
                                    <FormItem  className="flex items-center gap-x-2">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Featured
                                            </FormLabel>
                                            <FormDescription>
                                            Turn this ON to show Service to the featured list
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
                        </div>
                        <div className="flex items-center justify-between w-full">
                        <Button>Submit</Button>
                        <SheetClose>Cancel</SheetClose>
                        </div>
                    </form>
                </Form>

            </SheetContent>
        </Sheet>
    );
};
