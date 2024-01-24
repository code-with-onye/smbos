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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  orgName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  serviceType: z.string().min(2, {
    message: "Service type must be",
  }),
  orgSize: z
    .string({
      required_error: "Orginization size is required",
    })
    .min(2, {
      message: "Orginization size must be at least 2 characters.",
    }),
});

export const OrganizationForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { mutate: createOrg, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return axios.post("/orgnization", data);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orgName: "",
      serviceType: "",
      orgSize: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    createOrg(values, {
      onSuccess: (data) => {
        form.reset();
        console.log(data);
        toast.success("Organization created");
        setIsLoading(false);
        router.refresh();
      },
      onError: (error: any) => {
        console.log(error);
        setIsLoading(false);
        toast.error(error.response.data);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="orgName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your business name" {...field} />
              </FormControl>
              <FormDescription>This is your organizations name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select what service you provide" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Spa"> Spa</SelectItem>
                  <SelectItem value="Haircut"> Haircut</SelectItem>
                  <SelectItem value="Massage">Massage</SelectItem>
                  <SelectItem value="Manicure"> Manicure</SelectItem>
                  <SelectItem value="Pedicure"> Pedicure</SelectItem>
                  <SelectItem value="Other"> Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select what service you provide</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* orginization size */}

        <FormField
          control={form.control}
          name="orgSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="10-50">10-50</SelectItem>
                  <SelectItem value="50-100">50-100</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
