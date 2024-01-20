import React from 'react'
import {MainNav} from "@/app/(main)/admin/[orgId]/components/admin-nav";
import Image from 'next/image';
import { StorSwitcher } from '@/components/shared/store-switcher';


type SidebarProps =  {
   store: {
     storeId: string
     storeName: string
     storeImage: string | null
   }[] | undefined
}

const ProfileCard = ({store} : SidebarProps) => {
  return(
    <div className='p-4 border dark:border-slate-800 rounded-lg flex flex-col gap-y-3'>
       <div className='flex items-center gap-x-3'>
           {/* <Image src="/images/profile.png" alt="profile" width={48} height={48} /> */}
           <div className='relative w-12 h-12 rounded-full bg-black'/>

           <div className='ml-3 flex flex-col'>
               <h3 className='text-sm font-semibold'>John Doe</h3>
               <p className='text-xs underline cursor-pointer underline-offset-2 text-slate-500'>smbos.com/osusu</p>
           </div>
       </div>

       <StorSwitcher store={store}/>
    </div>
  )
}

export const Sidebar = ({store}: SidebarProps) => {
  return (
    <div className='h-[96vh] w-80 rounded-lg mx-3 mt-4 shadow-lg border dark:border-slate-800 bg-white dark:bg-[#272E38] p-3'>

      {/* profile card */}
      <div className='mb-44'>
      <ProfileCard store={store}/>
      </div>
         
       
       <MainNav  display='coloumn'/>
       
    </div>
  )
}
