import React from 'react'
import {MainNav} from "@/app/(main)/admin/[orgId]/components/admin-nav";

export const Sidebar = () => {
  return (
    <div className='h-[96vh] w-80 rounded-lg mx-3 mt-4 shadow-lg border dark:border-slate-800 bg-white dark:bg-[#272E38]'>
         
        <MainNav  display='coloumn'/>
    </div>
  )
}
