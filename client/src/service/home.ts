import { SERVER_HOST } from "@/lib/contastants";
import { HomeGetResponse } from "@/lib/types";
import axios, { AxiosError } from "axios";

export async function homeGet() {
  try {
    const data = await axios.get(`${SERVER_HOST}home/get`);
    return data.data as HomeGetResponse;
  } catch (error) {
    const e = error as AxiosError;

    if (e.response) {
      const res = e.response.data as HomeGetResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
}
