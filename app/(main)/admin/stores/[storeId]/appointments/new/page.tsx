import { getCategoriesByStoreId } from "@/lib/server-actions/category";
import { Appointments } from "./_components/appointements";
import { getOpenHoursByStoreId } from "@/lib/server-actions/open-hours";
import { hoursRange } from "@/lib/increment-time";
import { getAppointmentsByStoreId } from "@/lib/server-actions/appointments";

export default async function AppointmentsNewPage({
  params,
}: {
  params: { storeId: string };
}) {
  const { storeId } = params;
  const categories = await getCategoriesByStoreId(storeId);

  //   return just all categories
  const categoriesNamesAndIds = categories?.map((category) => {
    return {
      name: category.name,
      id: category.id,
      noOfService: category.services.length,
    };
  });

  //   return just all services
  const services = categories?.flatMap((category) => category.services);

  const opening = await getOpenHoursByStoreId(params.storeId as string);

  const getOpenHoursFromToday = opening?.map((hour) => {
    return {
      from: hour.from,
      to: hour.to,
    };
  });

  // Get Opening Hours
  const openHours = hoursRange(
    getOpenHoursFromToday as [{ from: string; to: string }]
  );

  // Get bookings by storeId
  const bookings = await getAppointmentsByStoreId(storeId as string);

  return (
    <div className="w-full px-4">
      <Appointments
        categories={categoriesNamesAndIds}
        services={services}
        hours={openHours[0]}
        bookings={bookings}
      />
    </div>
  );
}
