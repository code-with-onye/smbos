import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { ArrowLeftIcon, CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AppointmentProps } from "@/lib/types";

const appointmentSchema = z.object({
  date: z.date(),
  time: z.string().min(1, { message: "Time is required" }),
  customerName: z.string().min(1, { message: "Name is required" }),
  customerPhone: z.string().min(1, { message: "Phone is required" }),
  numberOfPeople: z.string().min(1, { message: "Number is required" }),
  // service: z.string().optional(),
  note: z.string(),
  serviceId: z.string(),
});



export const AppointmenntForm = ({
  hours,
  serviceId,
  bookings,
}: {
  hours: string[];
  serviceId: string;
  bookings: AppointmentProps[] | null;
}) => {
  const [step, setStep] = useState(0);
  const params = useParams();
  const router = useRouter();

  // console.log(booked);

  const { mutate } = useMutation({
    mutationKey: ["appointments"],
    mutationFn: (data: z.infer<typeof appointmentSchema>) => {
      return axios.post(`/store/${params.storeId}/appointments`, data);
    },
  });

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      date: new Date(),
      time: "",
      customerName: "",
      customerPhone: "",
      numberOfPeople: "",
      note: "",
      serviceId: serviceId,
    },
  });

  function onSubmit(values: z.infer<typeof appointmentSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    mutate(values, {
      onSuccess: (data) => {
        form.reset();
        toast.success("Appointment created");
        router.refresh();
        setStep(0);
      },
      onError: (error: any) => {
        console.log(error);
        toast.error(error.response.data);
      },
    });
  }

  const isBooked = (time: string) => {
    if (bookings) {
      return bookings.some((booking) => {
        if (serviceId === booking.serviceId) {
          return (
            booking.date.toDateString() ===
              form.watch("date")?.toDateString() && booking.time === time
          );
        }
      });
    }
    return false;
  };

  const isBookedDate = (date: Date) => {
    if (bookings) {
      return bookings.some((booking) => {
        if (serviceId === booking.serviceId) {
          return (
            booking.date.toDateString() === date.toDateString() &&
            booking.time === form.watch("time")
          );
        }
      });
    }
    return false;
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step === 0 && (
            <>
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col w-full mt-8 ">
                      <h3 className="text-lg font-semibold mb-4">
                        Select Time and Date
                      </h3>
                      <div className="grid grid-cols-4 gap-2">
                        {hours.map((hour) => (
                          <div
                            key={hour}
                            onClick={() => field.onChange(hour)}
                            className={cn(
                              "text-center border rounded-full p-1  text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground",
                              isBooked(hour)
                                ? "opacity-50 cursor-not-allowed"
                                : {
                                    "bg-primary text-primary-foreground":
                                      field.value === hour,
                                  }
                            )}
                          >
                            {hour}
                          </div>
                        ))}
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-y-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          className="flex w-full flex-col space-y-2 p-2"
                        >
                          <Select
                            onValueChange={(value) => {
                              if (value === "0") {
                                field.onChange(addDays(new Date(), 1));
                              } else if (value === "1") {
                                field.onChange(addDays(new Date(), 2));
                              } else if (value === "3") {
                                field.onChange(addDays(new Date(), 4));
                              } else if (value === "7") {
                                field.onChange(addDays(new Date(), 8));
                              }
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper" className="w-full">
                              <SelectItem value="0">Today</SelectItem>
                              <SelectItem value="1">Tomorrow</SelectItem>
                              <SelectItem value="3">In 3 days</SelectItem>
                              <SelectItem value="7">In a week</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="rounded-md border">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(value) => field.onChange(value)}
                              disabled={(date) => isBookedDate(date)}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormItem>
                )}
              />
            </>
          )}

          {/* customer form */}
          {step === 1 && (
            <div className="flex flex-col w-full mt-8 ">
              <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
              <div className="grid grid-cols-1 gap-y-8">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter customer name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter customer phone" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfPeople"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Number of people you are booking for
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select number to book " />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Just me</SelectItem>
                          <SelectItem value="2">2 people</SelectItem>
                          <SelectItem value="3">3 people</SelectItem>
                          <SelectItem value="4">4 people</SelectItem>
                          <SelectItem value="5">5 people</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us more about your booking"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Do you have any additional information you'd like us to
                        take note of?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          <div
            className={cn(
              "flex items-center gap-x-3 w-full",
              step === 1 && "justify-between"
            )}
          >
            {step === 1 && <Button type="submit">Submit</Button>}

            {step === 0 ? (
              <div
                onClick={() => setStep(step + 1)}
                className="bg-primary text-primary-foreground px-4 py-3 rounded-lg cursor-pointer hover:opacity-90 shadow-sm"
              >
                Continue
              </div>
            ) : (
              <div
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-x-1.5 px-4 py-3 hover:bg-slate-100 cursor-pointer rounded-lg"
              >
                <ArrowLeftIcon />
                Back
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
