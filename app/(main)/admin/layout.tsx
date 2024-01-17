import type { Metadata } from "next";
import { getOrgsByUserId } from "@/lib/server-actions/org";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
  description: "Manage your service business in one place",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const org = await getOrgsByUserId(user?.id as string);


  if (org?.length === 0) {
    return (
      <main>
        <h1 className="text-3xl font-bold">No Organization Found</h1>
      </main>
    );
  }

  return <main className="w-full flex flex-col">{children}</main>;
}
