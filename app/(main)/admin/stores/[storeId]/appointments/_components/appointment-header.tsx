"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import Link from "next/link";
import { useParams } from "next/navigation";

const SearchInput = () => {
  return (
    <div>
      <Input placeholder="Search" />
    </div>
  );
};

export const ApointmentHeader = () => {
  const params = useParams();

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Appointments</h3>
      <div className="flex w-full items-center justify-between mt-2">
        <SearchInput />
        <Link href={`/admin/stores/${params.storeId}/appointments/new`}>
          <Button>Book Appointment</Button>
        </Link>
      </div>
    </div>
  );
};
