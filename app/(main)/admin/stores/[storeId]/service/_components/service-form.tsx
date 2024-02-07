"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

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
import axios from "@/lib/axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CategoriesByStoreIdProps,
  CategoriesNamesAndIdProps,
  serviceProps,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  categoryId: z.string({
    required_error: "Choose a category",
  }),
  storeId: z.string(),
  serviceName: z.string().min(1, {
    message: "Category is required",
  }),
  serviceDescription: z.string().optional(),
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

type serviceFormProps = CategoriesNamesAndIdProps & serviceProps;

export const ServiceForm = ({
  categories,
  isEditing,
  serviceId,
  service,
}: serviceFormProps) => {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const { storeId } = params;

  console.log(categories);

  const { mutate: createService } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return axios.post("/service", data);
    },
    mutationKey: ["categories"],
  });

  const { mutate: updateService } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return axios.patch(`/service/${serviceId}`, data);
    },
    mutationKey: ["categories"],
  });

  const { mutate: deleteService } = useMutation({
    mutationFn: (id: string | undefined) => {
      return axios.delete(`/service/${id}`);
    },
    mutationKey: ["categories"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: isEditing ? service?.categoryId : "",
      serviceName: isEditing ? service?.name : "",
      storeId: storeId as string,
      serviceDescription: isEditing ? service?.description : "",
      servicePrice: isEditing ? service?.price : "",
      serviceDuration: isEditing ? service?.duration : "",
      servicePriceType: isEditing ? service?.priceType : "",
      serviceFeatured: isEditing ? service?.featured : false,
      serviceAvailable: isEditing ? service?.availability : false,
    },
  });

  const durations = ["5min", "10min", "15min", "20min"];

  function onSubmit(values: z.infer<typeof formSchema>) {
    setisLoading(true);

    console.log(values.categoryId);
    createService(values, {
      onSuccess: (data) => {
        form.reset();
        toast.success("Service created");
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

    updateService(values, {
      onSuccess: (data) => {
        form.reset();
        toast.success("Service updated");
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

  function onDelete() {
    setisLoading(true);
    deleteService(serviceId, {
      onSuccess: () => {
        toast.success("Service Deleted Sucessfuly");
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
      <form
        onSubmit={form.handleSubmit(isEditing ? onUpdate : onSubmit)}
        className="space-y-8 w-full "
      >
        {/* Layout 1 */}
        <div className="w-full bg-white shadow rounded-md p-4 ">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold">Basic Info</h3>
            <p className="text-sm">
              {isEditing ? "Edit" : "Add"} service name and choose the service
              type
            </p>
          </div>
          <div className="w-full mt-4 space-y-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            categories?.find(
                              (category) => category.id === service?.categoryId
                            )?.name || "Select a category"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
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

        {/* Layout 2 */}
        <div className="w-full bg-white shadow rounded-md p-4">
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
                      disabled={isLoading}
                    >
                      <FormControl className="bg-white">
                        <SelectTrigger>
                          <SelectValue className="capitalize" />
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
                        disabled={isLoading}
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

        {/* Layout 3 */}
        <div className="w-full bg-white shadow rounded-md p-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold">Display Service</h3>
            <p className="text-sm">Showcase your to your online store</p>
          </div>
          <div className="flex flex-col gap-y-3 items-start   rounded-lg border border-primary p-4 mt-4">
            <FormField
              disabled={isLoading}
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

        <div className="flex items-center gap-x-4 w-[20rem]">
          {isEditing ? (
            <div
              className={cn(
                "w-full p-3 rounded-md grid place-items-center bg-primary text-primary-foreground cursor-pointer",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => {
                form.handleSubmit(onUpdate)();
              }}
            >
              Save
            </div>
          ) : (
            <div
              className={cn(
                "w-full p-3 rounded-md grid place-items-center bg-primary text-primary-foreground cursor-pointer",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => {
                form.handleSubmit(onSubmit)();
              }}
            >
              Create
            </div>
          )}

          {isEditing && (
            <div
              className={cn(
                "w-full p-3 rounded-md grid place-items-center bg-destructive text-destructive-foreground cursor-pointer",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => onDelete()}
            >
              Delete
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};
