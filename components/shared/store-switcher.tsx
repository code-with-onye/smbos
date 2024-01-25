"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useStores } from "@/lib/store/stores";
import useLocalStorage from "@/lib/hooks/use-localstorage";
import { useRouter, useParams } from "next/navigation";
import { StoreForm } from "@/app/(main)/admin/stores/components/store-form";
import { RiShoppingBag2Fill } from "react-icons/ri";

type SidebarProps = {
  store:
    | {
        storeId: string;
        storeName: string;
        storeImage: string | null;
      }[]
    | undefined;
  currentStoreId: string;
};

export const StorSwitcher = ({ store, currentStoreId }: SidebarProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [storeIsLoading, setStoreIsLoading] = useState(false);
  const router = useRouter();
  const { storeId } = useParams();

  // const { storeId, setStoreId} = useStores()
  const [state, setState] = useLocalStorage("currentStoreId", currentStoreId);

  // useEffect for setting the current store if there is updated
  // useEffect(() => {
  //   setStoreId(currentStoreId)
  // }, [currentStoreId])

  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const selectedStore = store?.find((stores) => stores.storeId === storeId);

  return (
    <Sheet open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {storeIsLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse"></div>
                <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse"></div>
                <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse"></div>
              </div>
            ) : (
              <span className="text-ellipsis overflow-hidden whitespace-nowrap inline-flex ">
                {selectedStore?.storeName || "Select Store"}
              </span>
            )}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {store?.map((stores) => (
                <CommandItem
                  key={stores.storeName}
                  onSelect={() => {
                    setValue(stores.storeName);
                    //  setStoreId(stores.storeId)
                    setState(stores.storeId);
                    setStoreIsLoading(true);
                    router.push(`/admin/stores/${stores.storeId}`);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-5 w-5",
                      selectedStore?.storeId === stores.storeId
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {stores.storeName}
                </CommandItem>
              ))}
              <CommandSeparator />
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <div className="inline-flex items-center ">
                      <PlusCircledIcon className="mr-2 h-5 w-5" />
                      Create new store
                    </div>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <SheetContent side="right" className="">
        <SheetHeader>
          <SheetTitle>Create new store</SheetTitle>
          <SheetDescription>
            Add a new store to your account.
          </SheetDescription>
        </SheetHeader>

        <div className="w-full  flex justify-center">
          <div className="w-[30rem] p-4 rounded-lg shadow-md border bg-white dark:bg-black dark:border-slate-900 mt-20 ">
            <StoreForm />
            <SheetClose className="w-full mt-4">
              <div className="w-full border rounded-xl p-2.5 text-sm text-center text-slate-500 hover:text-slate-400 hover:bg-slate-50">
              Back to store
              </div>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
