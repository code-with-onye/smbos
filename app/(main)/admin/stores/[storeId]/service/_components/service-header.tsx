import { Button } from '@/components/ui/button'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
export const ServiceHeader = () => {
  return (
    <div className="flex items-center justify-between w-full my-4">
      <h3>Service Menus</h3>
      <Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent className="w-full">
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
    </div>
  )
}
