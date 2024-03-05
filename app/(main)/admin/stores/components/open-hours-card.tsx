"use client";
import { useState } from "react";
import z from "zod";

import TimePicker from "@/components/shared/time-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { OpenHoursSchema } from "@/lib/schemas/open-hours";
import toast from "react-hot-toast";
import { ImSpinner } from "react-icons/im";
import { useRouter } from "next/navigation";

export const OpenHoursCard = ({
  openHours,
}: {
  openHours: z.infer<typeof OpenHoursSchema>[] | undefined;
}) => {
  const { storeId } = useParams() as { storeId: string };
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const [days, setDays] = useState(
    openHours || [
      {
        day: "Mon",
        isOpen: true,
        from: "09:00",
        to: "18:00",
      },
      {
        day: "Tue",
        isOpen: true,
        from: "09:00",
        to: "18:00",
      },
      {
        day: "Wed",
        isOpen: true,
        from: "09:00",
        to: "18:00",
      },
      {
        day: "Thu",
        isOpen: true,
        from: "00:00",
        to: "00:10",
      },
      {
        day: "Fri",
        isOpen: true,
        from: "09:00",
        to: "18:00",
      },
      {
        day: "Sat",
        isOpen: false,
        from: "09:00",
        to: "18:00",
      },
      {
        day: "Sun",
        isOpen: false,
        from: "09:00",
        to: "18:00",
      },
    ]
  );

  const { mutate } = useMutation({
    mutationFn: (data: z.infer<typeof OpenHoursSchema>[]) => {
      return axios.post(`/store/${storeId}/opening-hours`, data);
    },
    mutationKey: ["store"],
  });

  const handleHourChange = (time: string, selectedDay: string) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];

      updatedDays.map((day) => {
        if (day.day === selectedDay) {
          day.from = time;
        }
      });
      return updatedDays;
    });
  };

  const handleMinuteChange = (time: string, selectedDay: string) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];

      updatedDays.map((day) => {
        if (day.day === selectedDay) {
          day.to = time;
        }
      });
      return updatedDays;
    });
  };

  const handleSubmit = () => {
    setisLoading(true);
    mutate(days, {
      onSuccess: (data) => {
        toast.success("Opening hours added");
        setisLoading(false);
        router.refresh();
      },
      onError: (error: any) => {
        console.log(error);
        toast.error(error.response.data);
        setisLoading(false);
      },
    });
  };

  return (
    <div className="w-full sm:w-[55%] p-4 bg-white shadow-lg rounded-lg ">
      <div className="mb-8 mt-2">
        <h3 className="text-lg font-semibold">Add your opening hours</h3>
        <p className="text-sm">
          Set standard opening hours to show on your store
        </p>
      </div>
      <div className="w-full flex flex-col gap-y-4">
        {days.map((day, index) => (
          <div className="flex items-center w-full justify-between" key={index}>
            <div className="inline-flex items-center gap-x-4">
              <Checkbox
                className="w-6 h-6"
                onCheckedChange={(checked) => {
                  setDays((prevDays) => {
                    const updatedDays = [...prevDays];
                    updatedDays[index].isOpen = checked ? true : false;
                    return updatedDays;
                  });
                }}
                checked={day.isOpen}
              />
              <span className={cn(!day.isOpen && "text-gray-400")}>
                {day.day}
              </span>
            </div>
            {day.isOpen ? (
              <TimePicker
                onHourChange={(time) => handleHourChange(time, day.day)}
                onMinuteChange={(time) => handleMinuteChange(time, day.day)}
                hour={day.from}
                minute={day.to}
              />
            ) : (
              <p className={cn(!day.isOpen && "text-gray-400")}>Closed</p>
            )}
          </div>
        ))}
      </div>

      <Button
        className={cn(
          "w-full mt-8",
          isLoading &&
            "cursor-not-allowed opacity-50 inline-flex gap-x-2 items-center"
        )}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading && <ImSpinner className="animate-spin" />}
        Save
      </Button>
    </div>
  );
};
