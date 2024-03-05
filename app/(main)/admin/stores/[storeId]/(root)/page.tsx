import Calendar from "@/components/shared/calender";
import { currentUser } from "@/lib/auth";

export default async function StorePage() {
  const user = await currentUser();

  return (
    <div>
      store
      <Calendar />
    </div>
  );
}
