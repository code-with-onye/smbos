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
