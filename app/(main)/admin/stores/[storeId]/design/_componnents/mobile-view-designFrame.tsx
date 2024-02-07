import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DesignFrame } from "./design-frame";

export const MobileView = () => {
  return (
    <Drawer>
      <DrawerTrigger className="block xl:hidden w-full">
        <div className="bg-black rounded-t-lg shadow-2xl shadow-primary text-white px-4 py-2 fixed bottom-0 w-full text-sm">
          Preview Design
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DesignFrame
          url={"https://linkedio.framer.ai/"}
          className="block xl:hidden w-full"
        />
      </DrawerContent>
    </Drawer>
  );
};
