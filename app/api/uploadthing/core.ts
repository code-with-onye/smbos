import { createUploadthing, type FileRouter } from "uploadthing/next";
import { currentUser } from "@/lib/auth";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  return { userId: user.id };
};

export const ourFileRouter = {
  categoryImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => await handleAuth())
    .onUploadComplete(async () => {}),
  categoryAttachment: f(["text", "image", "video", "audio"])
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),

  serviceImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
