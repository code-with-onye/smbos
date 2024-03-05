import type { Metadata } from "next";
import { currentUser } from "@/lib/auth";

import { Sidebar } from "../components/sidebar";
import {
  getCurrntStoreByUserId,
  getStoresByUserId,
} from "@/lib/server-actions/store";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { getOpenHoursByStoreId } from "@/lib/server-actions/open-hours";
import { OpenHoursCard } from "../components/open-hours-card";

export const metadata: Metadata = {
  title: "Service ",
  description: "Start creating your service",
};

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  //   check params id

  const user = await currentUser();
  const storeId = params.storeId;
  const currentStore = await getCurrntStoreByUserId(user?.id as string);
  const stores = await getStoresByUserId(user?.id as string);
  const openHours = await getOpenHoursByStoreId(storeId as string);

  const getStoreNamesAndImages = stores?.map((store) => {
    return {
      storeName: store.name,
      storeImage: store.storeImage,
      storeId: store.id,
    };
  });

  if (openHours?.length === 0) {
    return (
      <main className="w-full flex h-screen justify-center items-center">
        <OpenHoursCard />
      </main>
    );
  }

  return (
    <main className="w-full flex ">
      <Sidebar
        store={getStoreNamesAndImages}
        currentStoreId={currentStore?.id as string}
      />
      <div className="w-full h-screen overflow-y-auto">{children}</div>
    </main>
  );
}
