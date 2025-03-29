import { SERVER_HOST } from "@/lib/contastants";
import { GetCategoryProductsRespone } from "@/lib/types";
import axios, { AxiosError } from "axios";

export const getCategoryProducts = async ({
  categoryId,
}: {
  categoryId: string;
}) => {
  try {
    const res = await axios.get(`${SERVER_HOST}category/get/${categoryId}`);

    return res.data as GetCategoryProductsRespone;
  } catch (error) {
    const e = error as AxiosError;
    console.log(error);
    if (e.response) {
      const res = e.response.data as GetCategoryProductsRespone;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};
