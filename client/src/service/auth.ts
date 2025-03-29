import { SERVER_HOST } from "@/lib/contastants";
import { GetAuthResponse } from "@/lib/types";
import axios, { AxiosError } from "axios";

export async function getAuth({
  uid,
  mobileNo,
}: {
  uid: string | null | undefined;
  mobileNo: string | null | undefined;
}) {
  try {
    if (!uid || !mobileNo) {
      return null;
    }
    const res = await axios.post(`${SERVER_HOST}auth/login`, {
      uid,
      mobileNo,
    });
    return (res.data as GetAuthResponse).data;
  } catch (error) {
    const e = error as AxiosError;

    if (e.response) {
      const res = e.response.data as GetAuthResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
}
