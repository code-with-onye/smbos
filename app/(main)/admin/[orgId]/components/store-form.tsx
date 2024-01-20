"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  storeName: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }),
  whatsappNumber: z.string({
    required_error: "Whatsapp number is required",
    invalid_type_error: "Whatsapp number must be a string",
  })
});

export const StoreForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
      whatsappNumber: "",
    },
  });

  const {mutate: createStore} = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return axios.post("/store", data);
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    createStore(values, {
      onSuccess: (data) => {
        form.reset();
        // console.log(data);
        toast.success("Store created");
        setIsLoading(false);
        router.push(`/admin/${data.data.store.id}/service`);
      },
      onError: (error: any) => {
        console.log(error);
        setIsLoading(false);
        toast.error(error.response.data);
      },
    })
  }

  const storeName = form.watch("storeName") || "";
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="storeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input placeholder="Store Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsappNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Whatsapp Number</FormLabel>
              <FormDescription>Customer will book service to this number</FormDescription>
              <FormControl>
                <Input placeholder="Whatsapp Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="storeName"
          render={({ field }) => (
            <FormItem>
            <FormControl >
              <div className="grid gap-1">
                <FormLabel>Store Link</FormLabel>
                <FormDescription>Customer will book service to this link</FormDescription>
                <div className="relative">
                  <p className="text-sm text-muted-foreground absolute inset-y-2.5 mx-2">smbos.com/</p>
                  <Input
                    id="businessName"
                    placeholder="business name"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    className="pl-[5.5rem]"
                    value={storeName}
                    onChange={(e) => form.setValue("storeName", e.target.value)}
                  />
                </div>
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg" >
          Submit
        </Button>
      </form>
    </Form>
  );
};
