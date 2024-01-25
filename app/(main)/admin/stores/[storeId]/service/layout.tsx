
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Service ",
    description: "Start creating your service",
  };

export default async function ServiceLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full flex ">
            {children}
        </main>
    )
}