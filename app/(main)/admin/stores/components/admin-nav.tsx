"use client"
import Link from "next/link"
import { useRouter,  useParams, usePathname  } from "next/navigation"
import { cn } from "@/lib/utils"
import { IoIosSettings, IoIosHome, IoIosPeople,  IoIosApps } from "react-icons/io";


interface MainNavProps {
  className?: string
  display : "row" | "coloumn"
}


export function MainNav({
  className,
   display,
}: MainNavProps) {

  const router = useRouter()
  const pathname = usePathname()
  const { storeId } = useParams()

  const navItems = [
    { name: "Home", href: `/admin/stores/${storeId}/`, icon: IoIosHome },
    { name: "Users", href: `/admin/stores/${storeId}/users`, icon: IoIosPeople },
    { name: "Service", href: `/admin/stores/${storeId}/service`, icon: IoIosApps },
    { name: "Settings", href: `/admin/stores/${storeId}/settings`, icon: IoIosSettings },
  ]
  
  return (
    <nav
      className={cn("flex", className, display === "coloumn" ? "flex-col gap-y-3" : "flex-row items-center space-x-4 lg:space-x-6")}
    >
      {
        navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md p-1 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300", 
              pathname === item.href ? "bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-slate-300 px-1.5" : ""
            )}
          >
            <item.icon
              className={cn("w-4 h-4 mr-2", pathname === item.href ? "text-slate-900 dark:text-slate-300" : "text-slate-400 group-hover:text-slate-500 dark:text-slate-500")}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))
      }
    </nav>
  )
}