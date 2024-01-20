import type { Metadata } from "next";
import { Nav } from "../components/nav";
import { getStoresByOgnId } from "@/lib/server-actions/store";
import { StoreForm } from "../components/store-form";

export const metadata: Metadata = {
  title: "Admin ",
  description: "Manage your service business in one place",
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { orgId: string };
}) {
  const store = await getStoresByOgnId(params.orgId);

  if (store?.length === 0) {
    return (
      <main className="w-full flex flex-col  h-screen items-center justify-center">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold">{`Create a new store`}</h3>
          <p className="text-sm">{`Input your store's essential information`}</p>
        </div>
        <div className=" p-8 rounded-lg shadow-md border bg-white dark:bg-black dark:border-slate-900 w-[38%]">
          <StoreForm />
        </div>
      </main>
    );
  }

  return (
    <main className="w-full flex flex-col">
      <Nav />
      {children}
    </main>
  );
}
