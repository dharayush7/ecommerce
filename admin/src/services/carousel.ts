import { AddCarouselRequest, GetCarouselRespone } from "@/lib/type";
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

export const getCarousalRequest = async ({
  sessionId,
}: {
  sessionId: string;
}) => {
  try {
    const result = await axios.get(`${HOST}/admin/carousel/get`, {
      headers: {
        Authorization: `token ${sessionId}`,
      },
    });
    return result.data as GetCarouselRespone;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as GetCarouselRespone;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const deleteCarousalRequest = async ({
  sessionId,
  carouselId,
}: {
  sessionId: string;
  carouselId: string;
}) => {
  try {
    const result = await axios.post(
      `${HOST}/admin/carousel/delete`,
      { carouselId },
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
