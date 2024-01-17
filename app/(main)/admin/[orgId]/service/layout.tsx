
import type { Metadata } from "next";
import { Sidebar } from "@/app/(main)/admin/[orgId]/components/sidebar";


export const metadata: Metadata = {
    title: "Service ",
    description: "Start creating your service",
  };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full flex ">
            <Sidebar/>
            {children}
        </main>
    )
}