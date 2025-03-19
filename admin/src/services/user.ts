import { User } from "@/lib/type";
import axios, { AxiosError } from "axios";

const HOST = process.env.SERVER_HOST!;

interface GetUserResponse {
  msg: string;
  data: User[];
}

export const getUserRequest = async (sessionId: string) => {
  try {
    const result = await axios.get(`${HOST}/admin/user/get`, {
      headers: {
        Authorization: `Baerer ${sessionId}`,
      },
    });
    return result.data as GetUserResponse;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as GetUserResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};
