
import type { Metadata } from "next";
import { Nav } from "./components/nav";


export const metadata: Metadata = {
    title: "Admin ",
    description: "Manage your service business in one place",
  };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full flex flex-col">
            <Nav/>
            {children}
        </main>
    )
}