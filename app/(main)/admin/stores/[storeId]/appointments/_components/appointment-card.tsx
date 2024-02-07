"use client";
import { Button } from "@/components/ui/button";

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

export const AppointmentCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div
        className="flex flex-col p-4 mt-4 shadow-md bg-white border rounded-lg w-full cursor-pointer  hover:shadow-primary/30"
        onClick={() => setIsOpen(true)}
      >
        <h3 className="text-lg font-semibold">James Doe</h3>
        <div className="grid grid-cols-2 text-sm sm:grid-cols-4 gap-2 mt-2 sm:mx-8">
          <p>Hair Braiding</p>
          <p>4:00 PM - 5:00 PM</p>
          <p>24 June, 2023 12:00 AM</p>
          <span className="rounded-full text-green-500 p-1 text-center">
            Confirmed
          </span>
        </div>
      </div>
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
