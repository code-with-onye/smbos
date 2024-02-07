import { cn } from "@/lib/utils";
import React from "react";

export const DesignFrame = ({
  url,
  className,
}: {
  url?: string;
  className?: string;
}) => {
  return (
    <section className={cn("lg:w-[40%] w-full", className)}>
      <div className="flex">
        <div
          className="bg-black rounded-lg shadow-2xl"
          style={{ width: 390, height: 820 }}
        >
          {/* Top notch */}
          <div className="bg-black w-full h-6 rounded-t-lg">
            <div className="bg-black h-6 w-6 rounded-full relative left-1/2 top-1"></div>
          </div>

          {/* Wrapper for iframe */}
          <div className="overflow-hidden rounded-b-lg">
            <iframe
              src={url}
              allowFullScreen={true}
              sandbox="allow-scripts allow-forms allow-same-origin"
              style={{ width: "390px", height: "800px" }}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
