"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
  onUpload: (url: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onUpload, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onUpload(res?.[0].url);
      }}
      onUploadError={(err: Error) => {
        toast.error("something went wrong");
      }}
    />
  );
};
