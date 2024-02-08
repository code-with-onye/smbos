"use client";
import { useState } from "react";

import TimePicker from "@/components/shared/time-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


export const OpenHoursCard = () => {
  const [days, setDays] = useState([
    {
      day: "Mon",
      checked: true,
      hour: "00:00",
      minute: "00:10",
    },
    {
      day: "Tue",
      checked: true,
      hour: "00:00",
      minute: "00:10",
    },
    {
      day: "Wed",
      checked: true,
      hour: "00:00",
      minute: "00:10",
    },
    {
      day: "Thu",
      checked: true,
      hour: "00:00",
      minute: "00:10",
    },
    {
      day: "Fri",
      checked: true,
      hour: "00:00",
      minute: "00:10",
    },
    {
      day: "Sat",
      checked: false,
      hour: "00:00",
      minute: "00:10",
    },
    {
      day: "Sun",
      checked: false,
      hour: "00:00",
      minute: "00:10",
    },
  ]);


  const handleHourChange = (time: string, selectedDay: string) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];

      updatedDays.map((day) => {
        if (day.day === selectedDay) {
          day.hour = time;
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
          day.minute = time;
        }
      });
      return updatedDays;
    });
  };

  return (
    <div className="w-full sm:w-[70%] p-4 bg-white shadow-lg rounded-lg ">
      <div className="mb-8 mt-2">
        <h3 className="text-lg font-semibold">Add your opening hours</h3>
        <p className="text-sm">Set standard opening hours to show on your store</p>
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
                    updatedDays[index].checked = checked ? true : false;
                    return updatedDays;
                  });
                }}
                checked={day.checked}
              />
              <span className={cn(!day.checked && "text-gray-400")}>
                {day.day}
              </span>
            </div>
            {day.checked ? (
              <TimePicker
                onHourChange={(time) => handleHourChange(time, day.day)}
                onMinuteChange={(time) => handleMinuteChange(time, day.day)}
                hour={day.hour}
                minute={day.minute}
              />
            ) : (
              <p className={cn(!day.checked && "text-gray-400")}>Closed</p>
            )}
          </div>
        ))}
      </div>

      <Button className="w-full mt-8">Save</Button>
    </div>
  );
};
