import { getOpenHoursByStoreId } from "@/lib/server-actions/open-hours";
import { OpenHoursCard } from "../../components/open-hours-card";

export default async function SettingsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const { storeId } = params;
  const openHours = await getOpenHoursByStoreId(storeId as string);

  const getHoursIdFromToday = openHours?.map((hour) => {
    return {
      id: hour.id,
      day: hour.day,
      isOpen: hour.isOpen,
      from: hour.from,
      to: hour.to,
    };
  });

  return (
    <div>
      {/* Open hours */}
      <OpenHoursCard openHours={getHoursIdFromToday} />
    </div>
  );
}
