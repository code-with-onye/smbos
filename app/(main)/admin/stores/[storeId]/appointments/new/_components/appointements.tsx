"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppointmentDetails } from "../../_components/appointment-details";
import { AppointmenntForm } from "../../_components/appointment-form";
import { AppointmentProps } from "@/lib/types";

interface AppointmentsProps {
  categories:
    | {
        name: string;
        id: string;
        noOfService: number;
      }[]
    | undefined;
  services:
    | {
        id: string;
        name: string;
        description: string;
        price: string;
        categoryId: string;
        duration: string;
        priceType: string;
        availability: boolean;
      }[]
    | undefined;

  hours: string[];
  bookings: AppointmentProps[] | null;
}

export const Appointments = ({
  categories,
  services,
  hours,
  bookings,
}: AppointmentsProps) => {
  //   const params = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string>("");
  const [selectedService, setSelectedService] = React.useState<string>(
    categories?.[0]?.id || ""
  );

  return (
    <div className="w-full mt-8">
      {/* Catrgories view */}
      <div className="flex items-center gap-x-3">
        {categories?.map((category) => {
          return (
            <div
              key={category.id}
              className={cn(
                "cursor-pointer border rounded-full p-3 bg-white text-xs shadow-sm transition-all translate-x-1 duration-100 hover:translate-x-0 inline-flex items-center gap-x-1.5",

                selectedService === category.id
                  ? "bg-black text-slate-50 translate-x-1 duration-100 hover:translate-x-0"
                  : "border-gray-300 text-gray-500"
              )}
              onClick={() => setSelectedService(category.id)}
            >
              <h1>{category.name}</h1>
              <p>{category.noOfService}</p>
            </div>
          );
        })}
      </div>

      {/* Services view */}
      <div className="mt-4">
        {selectedService &&
          services
            ?.filter((service) => service.categoryId === selectedService)
            .map((service) => {
              return (
                <div
                  key={service.id}
                  className="border p-8 bg-white shadow rounded-lg flex justify-between items-center"
                >
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <h1 className="text-sm capitalize">{service.name}</h1>
                    <Button
                      onClick={() => {
                        setBookingService(service.id);
                        setIsOpen(true);
                      }}
                    >
                      Book
                    </Button>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetDescription>
                          <div className="w-full">
                            {/* <AppointmentDetails /> */}
                            <AppointmenntForm
                              hours={hours}
                              serviceId={bookingService}
                              bookings={bookings}
                            />
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>
              );
            })}

        {/* checking if service not found display not found */}
        {!services?.filter((service) => service.categoryId === selectedService)
          .length && (
          <div className="w-full flex justify-center items-center bg-white border rounded-lg shadow-sm p-12">
            <h3>No services Found</h3>
          </div>
        )}
      </div>
    </div>
  );
};
