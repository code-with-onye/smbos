
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { DialogTrigger } from "@radix-ui/react-dialog"
import Link from "next/link"

  type SidebarProps =  {
    store: {
      storeId: string
      storeName: string
      storeImage: string | null
    }[] | undefined
 }

   
export const StorSwitcher = ({store}: SidebarProps) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    console.log(value)
    const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"

        >
          {value
            ? store?.find((stores) => stores.storeName === value)?.storeName
            : "Select Store..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
           {
             store?.map((stores) => (
               
                  <CommandItem
                 key={stores.storeName}
                 onSelect={() => {
                   setValue(stores.storeName)
                   setOpen(false)
                 }}
               >
                 <CheckIcon
                   className={cn(
                     "mr-2 h-5 w-5",
                     value === stores.storeName
                       ? "opacity-100"
                       : "opacity-0"
                   )}
                 />
                 {stores.storeName}
               </CommandItem>
             ))
           }
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewTeamDialog(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create new store
                  </CommandItem>
                
              </CommandGroup>
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
