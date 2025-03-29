import axios, { AxiosError } from "axios";
import { SERVER_HOST } from "@/lib/contastants";
import { GetCartResponse } from "@/lib/types";

export const addItemToCart = async ({
  productId,
  qyt,
  uid,
}: {
  uid: string;
  productId: string;
  qyt: number;
}) => {
  try {
    const data = localStorage.getItem("cart");
    if (data) {
      const newdata = [...Array(data), productId];
      localStorage.setItem("cart", newdata.toString());
    } else {
      localStorage.setItem("cart", [productId].toString());
    }
    const res = await axios.post(
      `${SERVER_HOST}cart/add`,
      {
        productId,
        qyt,
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
};

export const getCart = async ({ uid }: { uid: string }) => {
  try {
    const res = await axios.get(`${SERVER_HOST}cart/get`, {
      headers: {
        Authorization: `Barear ${uid}`,
      },
    });

    return (res.data as GetCartResponse).data;
  } catch (error) {
    const e = error as AxiosError;
    console.log(error);
    if (e.response) {
      const res = e.response.data as GetCartResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const incrementItem = async ({
  productId,
  uid,
}: {
  uid: string;
  productId: string;
}) => {
  try {
    const res = await axios.get(`${SERVER_HOST}cart/increase?id=${productId}`, {
      headers: {
        Authorization: `Barear ${uid}`,
      },
    });

    return res.data as { msg: string };
  } catch (error) {
    const e = error as AxiosError;
    console.log(error);
    if (e.response) {
      const res = e.response.data as { msg: string };
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const decrementItem = async ({
  productId,
  uid,
}: {
  uid: string;
  productId: string;
}) => {
  try {
    const res = await axios.get(`${SERVER_HOST}cart/decrease?id=${productId}`, {
      headers: {
        Authorization: `Barear ${uid}`,
      },
    });

    return res.data as { msg: string };
  } catch (error) {
    const e = error as AxiosError;
    console.log(error);
    if (e.response) {
      const res = e.response.data as { msg: string };
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const switchItem = async ({
  productId,
  uid,
}: {
  uid: string;
  productId: string;
}) => {
  try {
    const res = await axios.get(`${SERVER_HOST}cart/switch?id=${productId}`, {
      headers: {
        Authorization: `Barear ${uid}`,
      },
    });

    return res.data as { msg: string };
  } catch (error) {
    const e = error as AxiosError;
    console.log(error);
    if (e.response) {
      const res = e.response.data as { msg: string };
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const removeItemToCart = async ({
  productId,
  uid,
}: {
  uid: string;
  productId: string;
}) => {
  try {
    const data = localStorage.getItem("cart");
    if (data) {
      const newdata = data.split(",").filter((e) => e != productId);
      localStorage.setItem("cart", newdata.toString());
    }
    const res = await axios.post(
      `${SERVER_HOST}cart/remove`,
      {
        productId,
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
};
