interface Time {
  hours: number;
  minutes: number;
}

export function incrementTime(
  startTime: string,
  incrementMins: number,
  iterations: number
): string[] {
  const times: string[] = [];

  let { hours, minutes } = parseTime(startTime);

  for (let i = 0; i < iterations; i++) {
    times.push(
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    );

    minutes += incrementMins;

    if (minutes >= 60) {
      hours++;
      minutes = 0;

      if (hours >= 24) {
        hours = 0;
      }
    }
  }

  return times;
}

function parseTime(time: string): Time {
  const [hours, minutes] = time.split(":");
  return {
    hours: parseInt(hours),
    minutes: parseInt(minutes),
  };
}

interface HoursRange {
  from: string;
  to: string;
}

// export const hoursRange = (days: HoursRange[]) => {
//     const hours = incrementTime("00:00", 15, 24 * 7);

//   return days?.map((day) => {
//     const startIndex = findNearestIndex(day.from, hours);
//     const endIndex = findNearestIndex(day.to, hours);

//     let currentHours = [];
//     for (let i = startIndex; i <= endIndex; i++) {
//       currentHours.push(hours[i]);
//       if (i === hours.length - 1) {
//         i = -1;
//       }
//     }

//     return currentHours;
//   });
// };

function findNearestIndex(time: string, hours: string[]) {
  let minDiff = Infinity;
  let closestIndex = 0;

  hours.forEach((hour, index) => {
    const diff = Math.abs(timeToNumber(hour) - timeToNumber(time));

    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function timeToNumber(time: string) {
  const [strHour, strMin] = time.split(":");
  const hour = parseInt(strHour);
  const min = parseInt(strMin);

  return hour + min / 60;
}

export const hoursRange = (days: HoursRange[]) => {
  const hours = incrementTime("00:00", 15, 24 * 7);
  return days.map((day) => {
    const startIndex = findNearestIndex(day.from, hours);
    const endIndex = findNearestIndex(day.to, hours);

    let currentHours = [];
    for (let i = startIndex; i <= endIndex; i++) {
      currentHours.push(hours[i]);
      if (i === hours.length - 1) {
        i = -1;
      }
    }

    // Convert 24 hour format to 12 hour with AM/PM
    return currentHours.map((hour) => {
      if (!hour) {
        return hour;
      }
      const parts = hour.split(":");
      const h = parseInt(parts[0]);
      const suffix = h < 12 || h === 24 ? "AM" : "PM";
      const twelveHour = h % 12 || 12;

      return `${twelveHour}:${parts[1]} ${suffix}`;
    });
  });
};
