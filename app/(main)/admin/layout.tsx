import type { Metadata } from "next";
import { getOrgsByUserId } from "@/lib/server-actions/org";
import { currentUser } from "@/lib/auth";
import { OrganizationForm } from "./[orgId]/components/orgnization-form";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

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
      <main className="w-full flex flex-col  h-screen items-center justify-center">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold">{`Let's set up your business account`}</h3>
          <p className="text-sm">Provide information about your organization or company </p>
        </div>
        <div className=" p-8 rounded-lg shadow-md border bg-white dark:bg-black dark:border-slate-900 w-[38%]">
          <OrganizationForm />
        </div>
        <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant="ghost">Log Out</Button>
      </form>
      </main>
    );
  }

  return <main className="w-full flex flex-col">{children}</main>;
}
