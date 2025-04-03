import { SERVER_HOST } from "@/lib/contastants";
import { AddressType, getAddressRespons } from "@/lib/types";
import axios, { AxiosError } from "axios";

export async function getAddress({ uid }: { uid: string }) {
  try {
    const res = await axios.get(`${SERVER_HOST}address/get`, {
      headers: {
        Authorization: `Barear ${uid}`,
      },
    });
    return (res.data as getAddressRespons).data;
  } catch (error) {
    const e = error as AxiosError;

    if (e.response) {
      const res = e.response.data as getAddressRespons;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
}

export async function addAddress({
  data,
  uid,
}: {
  data: Omit<AddressType, "id">;
  uid: string;
}) {
  try {
    const res = await axios.post(
      `${SERVER_HOST}address/add`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Barear ${uid}`,
        },
      }
    );

    return res.data as { msg: string };
  } catch (error) {
    const e = error as AxiosError;

    if (e.response) {
      const res = e.response.data as { msg: string };
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
}

export async function updateAddress({
  data,
  uid,
}: {
  data: AddressType;
  uid: string;
}) {
  try {
    const res = await axios.post(
      `${SERVER_HOST}address/update`,
      {
        ...data,
        addressId: data.id,
      },
      {
        headers: {
          Authorization: `Barear ${uid}`,
        },
      }
    );

    return res.data as { msg: string };
  } catch (error) {
    const e = error as AxiosError;

    if (e.response) {
      const res = e.response.data as { msg: string };
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
}

export async function deleteAddress({ id, uid }: { uid: string; id: string }) {
  try {
    const res = await axios.get(`${SERVER_HOST}address/delete/${id}`, {
      headers: {
        Authorization: `Barear ${uid}`,
      },
    });

    return res.data as { msg: string };
  } catch (error) {
    const e = error as AxiosError;

    if (e.response) {
      const res = e.response.data as { msg: string };
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
}
