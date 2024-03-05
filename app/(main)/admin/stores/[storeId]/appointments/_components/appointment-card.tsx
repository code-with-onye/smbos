"use client";
import { Button } from "@/components/ui/button";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { AppointmentDetails } from "./appointment-details";
import { AppointmentProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ImSpinner10 } from "react-icons/im";

export const AppointmentCard = ({
  bookings,
}: {
  bookings: AppointmentProps[] | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {bookings?.map((booking) => (
        <div
          className="flex flex-col p-4 mt-4 shadow-md bg-white border rounded-lg w-full cursor-pointer  hover:shadow-primary/30"
          onClick={() => setIsOpen(true)}
        >
          <h3 className="text-lg font-semibold">{booking.customerName}</h3>
          <div className="grid grid-cols-2 text-sm sm:grid-cols-4 gap-2 mt-2 sm:mx-8">
            <p>{booking.serviceId}</p>
            <p>{booking.time}</p>
            <p>{format(booking.date, "dd-MM-yyyy")}</p>
            <div
              className={cn(
                "rounded-fullp-1 text-center capitalize flex items-center gap-x-1",
                {
                  "text-red-500": booking.status === "Declined",
                  "text-green-500 ": booking.status === "Accepted",
                  " text-yellow-500 ": booking.status === "pending",
                }
              )}
            >
              {booking.status === "pending" && (
                <ImSpinner10 className="animate-spin" />
              )}
              {booking.status}
            </div>
          </div>
        </div>
      ))}

      <SheetContent side="bottom">
        <SheetHeader>
          <SheetDescription>
            <div className="w-full">
              <AppointmentDetails />
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
