import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IoIosClock,
  IoIosContact,
  IoIosImage,
  IoIosLink,
  IoIosPaper,
  IoIosText,
  IoIosVideocam,
} from "react-icons/io";

const cardContent = [
  {
    name: "Service",
    icon: IoIosPaper
  },
  {
    name: "Link",
    icon: IoIosLink
  },
  {
    name: "Text",
    icon: IoIosText
  },
  {
    name: "Image",
    icon: IoIosImage
  },
  {
    name: "Video",
    icon: IoIosVideocam
  },
  {
    name: "Contact",
    icon: IoIosContact
  },
]

const AddCard = () => {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger className="w-full bg-primary text-primary-foreground rounded-2xl p-2 ">
        Add Card
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {cardContent.map((card) => (
          <DropdownMenuItem key={card.name}>
            <div className="flex items-center gap-x-2">
              <card.icon size={20} />
              <span>{card.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
       
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const DesignBoard = () => {
  return (
    <div className="lg:w-[60%] w-full">
      <AddCard />
    </div>
  );
};
