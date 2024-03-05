"use client";
import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

interface Day {
  value: Date;
  events?: string[];
}

enum View {
  MONTH = "month",
  WEEK = "week",
  DAY = "day",
}

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState(View.MONTH);

  const renderHeader = () => (
    <header className="flex">
      <button onClick={() => setView(View.MONTH)}>Month</button>
      <button onClick={() => setView(View.WEEK)}>Week</button>
      <button onClick={() => setView(View.DAY)}>Day</button>
    </header>
  );

  const renderDays = () => {
    switch (view) {
      case View.MONTH:
        // return month view
        break;

      case View.WEEK:
        // return week view
        break;

      case View.DAY:
        // return day view
        break;
    }
  };

  const handlePrevious = () => {
    const previousMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1
    );
    setCurrentMonth(previousMonth);
  };

  const handleNext = () => {
    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1
    );
    setCurrentMonth(nextMonth);
  };

  const days: Day[] = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  }).map((day: any) => {
    return {
      value: day,
      events: [],
    };
  });

  return (
    <div className="mx-10 my-6">
      {/* {renderHeader()} */}
      <>{renderDays()}</>
      <div className="flex justify-between mb-6 text-gray-500">
        <button onClick={handlePrevious}>Previous</button>
        <h2 className="text-xl text-gray-800 font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={handleNext}>Next</button>
      </div>

      <div className="-mx-1 grid grid-cols-7 gap-2 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className="text-xs font-bold text-gray-500 border p-1">
            {d}
          </div>
        ))}

        {days.map((day) => {
          return (
            <div
              key={day.value.getTime()}
              className={`border p-1 hover:bg-blue-100 cursor-pointer ${
                day.value === selectedDate ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setSelectedDate(day.value)}
            >
              <div className="text-sm">{format(day.value, "d")}</div>

              {day.events?.map((event) => (
                <div key={event} className="text-gray-400 text-xs">
                  {event}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
