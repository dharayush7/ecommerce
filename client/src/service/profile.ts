import { SERVER_HOST } from "@/lib/contastants";
import axios, { AxiosError } from "axios";

export async function profileUpdate({
  email,
  name,
  uid,
}: {
  name: string;
  email: string;
  uid: string;
}) {
  try {
    const data = await axios.post(
      `${SERVER_HOST}profile/update`,
      {
        name,
        email,
      },
      {
        headers: {
          Authorization: `Barear ${uid}`,
        },
      }
    );
    return data.data as { msg: string };
  } catch (error) {
    const e = error as AxiosError;

    if (e.response) {
      const res = e.response.data as { msg: string };
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
}
