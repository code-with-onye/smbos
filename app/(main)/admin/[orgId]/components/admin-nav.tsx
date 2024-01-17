import Link from "next/link"

import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
  display : "row" | "coloumn"
}

export function MainNav({
  className,
   display,
}: MainNavProps) {
  return (
    <nav
      className={cn("flex", className, display === "coloumn" ? "flex-col gap-y-3" : "flex-row items-center space-x-4 lg:space-x-6")}
    >
      <Link
        href="/admin"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/admin/customers"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link>
      <Link
        href="/admin/service"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Services
      </Link>
      <Link
        href="/admin/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  )
}