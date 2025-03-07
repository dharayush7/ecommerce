import { UTApi } from "uploadthing/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});
console.log("\x1b[32mFetching medias in bucket...\x1b[0m");
const files = await utapi.listFiles();
console.log("\x1b[32Fetching medias in database...\x1b[0m");
const medias = await prisma.productImage.findMany({
  select: {
    url: true,
  },
});

const arr = [];
const url = [];
console.log("\x1b[Sorting medias...\x1b[0m");
medias.map((e) => {
  url.push(e.url.split("/")[4]);
});

files.files.map((e) => {
  if (!url.includes(e.key)) {
    arr.push(e);
  }
});
console.log("\x1b[Deleting medias...\x1b[0m");
utapi.deleteFiles(arr.map((e) => e.key));
console.log("\x1b[Unused media file deleted.\x1b[0m");
