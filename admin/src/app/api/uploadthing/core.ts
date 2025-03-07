import { createUploadthing, FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { uploadRequest } from "@/services/upload";

const f = createUploadthing();
export const fileRouter = {
  media: f({
    image: { maxFileSize: "8MB", maxFileCount: 5 },
  }).onUploadComplete(async ({ file }) => {
    try {
      const result = await uploadRequest({ url: file.ufsUrl });
      return { mediaId: result.data.mediaId };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new UploadThingError(error.message);
      }

      throw new UploadThingError(String(error));
    }
  }),
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;
