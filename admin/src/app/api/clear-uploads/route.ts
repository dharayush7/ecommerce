import {
  deleteUnusedMediaRequest,
  getUnusedMediaRequest,
} from "@/services/upload";
import { UTApi } from "uploadthing/server";

export async function GET() {
  try {
    const unUsedMediaUrl = await getUnusedMediaRequest();
    new UTApi().deleteFiles(unUsedMediaUrl.data.map((e) => e.split("/")[4]));
    await deleteUnusedMediaRequest();
    return new Response();
  } catch (error) {
    console.log(error);
    return Response.json({ msg: "Internal server error" }, { status: 500 });
  }
}
