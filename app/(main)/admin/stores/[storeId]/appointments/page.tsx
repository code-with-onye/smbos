import { getOpenHoursByStoreId } from "@/lib/server-actions/open-hours";
import { AppointmentCard } from "./_components/appointment-card";
import { ApointmentHeader } from "./_components/appointment-header";
import { getAppointmentsByStoreId } from "@/lib/server-actions/appointments";

export default async function AppointmentsPage({
  params,
}: { params: { storeId: string } }) {

  const appointments = await getAppointmentsByStoreId(params.storeId as string);  

  return (
    <section className="w-full px-4">
      <ApointmentHeader />
      <AppointmentCard bookings={appointments}/>
    </section>
  );
}
