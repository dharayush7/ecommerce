import { ProductGetResponse } from "@/lib/types";
import axios, { AxiosError } from "axios";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST!;

export async function productGet(id: string) {
  try {
    const data = await axios.get(`${SERVER_HOST}product/get/${id}`);
    return data.data as ProductGetResponse;
  } catch (error) {
    const e = error as AxiosError;

    if (e.response) {
      const res = e.response.data as ProductGetResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
}
