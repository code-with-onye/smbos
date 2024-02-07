import { AppointmentCard } from "./_components/appointment-card";
import { ApointmentHeader } from "./_components/appointment-header";

export default function AppointmentsPage() {
    return (
        <section className="w-full px-4">
            <ApointmentHeader/>
            <AppointmentCard/>
        </section>
    )
}