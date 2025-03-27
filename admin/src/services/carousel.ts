import { AddCarouselRequest } from "@/lib/type";
import axios, { AxiosError } from "axios";

const HOST = process.env.SERVER_HOST!;

export const addCarousalRequest = async ({
  sessionId,
  ...body
}: AddCarouselRequest) => {
  try {
    const result = await axios.post(
      `${HOST}/admin/carousel/add`,
      { ...body },
      {
        headers: {
          Authorization: `token ${sessionId}`,
        },
      }
    );
    return result.data as { msg: string };
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as { msg: string };
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};
