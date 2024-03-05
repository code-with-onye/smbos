import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { incrementTime } from "@/lib/increment-time";

interface TimePickerProps {
  //   onTimeChange: (time: string) => void;
  onHourChange: (hour: string) => void;
  onMinuteChange: (minute: string) => void;
  hour: string;
  minute: string;
}

function TimePicker({
  onHourChange,
  onMinuteChange,
  hour,
  minute,
}: TimePickerProps) {
  const times = incrementTime("00:00", 5, 288);

  return (
    <div className="flex items-center gap-x-3">
      <Select onValueChange={onHourChange} defaultValue={hour}>
        <SelectTrigger>
          <SelectValue placeholder={hour} />
        </SelectTrigger>
        <SelectContent>
          {times.map((time, i) => (
            <SelectItem key={i} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span className="text-gray-500">-</span>

      <Select onValueChange={onMinuteChange} defaultValue={minute}>
        <SelectTrigger>
          <SelectValue placeholder={minute} />
        </SelectTrigger>
        <SelectContent>
          {times.map((time, i) => (
            <SelectItem key={i} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default TimePicker;
