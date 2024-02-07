import { Button } from "@/components/ui/button";
import React from "react";

export const AppointmentDetails = () => {
  return (
    <div className="border  p-3 rounded-lg shadow-sm bg-[#F5F5F5] w-full mx-auto max-w-lg">
      <div className="flex justify-between  ">
        <h3 className="text-lg font-semibold text-black">Jon Doe</h3>
        <p className="text-sm">Ref #123456</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold">Booked for</h3>
          <p className="text-sm">Hair Braiding</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold">ON</h3>
          <p className="text-sm">24 Dec 2024 4:00 PM</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold">Service period</h3>
          <p className="text-sm">4:00 PM - 5:00 PM</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold">Service Price</h3>
          <p className="text-sm">NGN 10,000</p>
        </div>
      </div>
      <div className="flex flex-col mt-20 w-full ">
        <Button className="w-full mt-4">Accept</Button>
        <Button className="w-full mt-4" variant="destructive">
          Decline
        </Button>
        <Button className="w-full mt-4" variant="secondary">
          Reschedule
        </Button>
      </div>
    </div>
  );
};
