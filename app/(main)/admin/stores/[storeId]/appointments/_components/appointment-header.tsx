import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const SearchInput = () => {
  return (
    <div>
      <Input placeholder="Search" />
    </div>
  );
};

export const ApointmentHeader = () => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Appointments</h3>
      <div className="flex w-full items-center justify-between mt-2">
        <SearchInput />
        <Button>Book Appointment</Button>
      </div>
    </div>
  );
};
