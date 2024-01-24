
"use client"
import { useState, useEffect } from "react"
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
import { useStores } from "@/lib/store/stores";
import useLocalStorage from "@/lib/hooks/use-localstorage"
import { useRouter, useParams } from "next/navigation"

  type SidebarProps =  {
    store: {
      storeId: string
      storeName: string
      storeImage: string | null
    }[] | undefined,
    currentStoreId: string
 }

   
export const StorSwitcher = ({store, currentStoreId}: SidebarProps) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const router = useRouter()
    const { storeId } = useParams()


    // const { storeId, setStoreId} = useStores()
    const [state, setState] = useLocalStorage("currentStoreId", currentStoreId)


    // useEffect for setting the current store if there is updated
    // useEffect(() => {
    //   setStoreId(currentStoreId)
    // }, [currentStoreId])

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
            ? store?.find((stores) => stores.storeId === storeId)?.storeName
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
                  //  setStoreId(stores.storeId)
                   setState(stores.storeId)
                   router.push(`/admin/stores/${stores.storeId}/service`);
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
