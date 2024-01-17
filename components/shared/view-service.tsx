import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

interface ServiceProps {
  name: string;
  description: string;
  price: string;
  image: string;
  userId: string;
  categoryId: string;
  availability: Boolean;
  featured: Boolean;
  children: React.ReactNode;
}

export const ViewService = ({
  name,
  description,
  price,
  image,
  userId,
  categoryId,
  availability,
  featured,
  children,
}: ServiceProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        {children}
      </SheetTrigger>
      <SheetContent side="right" >
       
      <div className="w-full h-60 drop-shadow-lg">
              <Image src={image} alt={name} className="rounded-lg" fill />
       </div>
        <div>

          <div className="flex flex-col ">
            <span className="text-xs my-2 font-bold uppercase tracking-wider text-primary">Skincare</span>
            <h4 className="text-lg font-semibold mt-1">{price}</h4>
            <p className="text-sm">{description}</p>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
};
