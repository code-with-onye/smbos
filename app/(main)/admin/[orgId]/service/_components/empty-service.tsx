import { Button } from '@/components/ui/button'
import { RiUDiskLine } from "react-icons/ri";

import { ServiceButton } from '@/app/(main)/admin/[orgId]/service/_components/service-button';
export const EmptyService = () => {
  return (
    <div className='w-full border-2 shadow-xl rounded-md h-[88vh] flex flex-col items-center justify-center bg-white'>
     <div className="flex flex-col items-center justify-center gap-y-3">
      
      <div>
      <RiUDiskLine className="w-40 h-40 text-gray-900" />
      <p>No service created yet!</p>
      </div>

    <ServiceButton/>
      
     </div>
             
    </div>
  )
}
