"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ProductRequest } from "@/lib/type";
import { addProductRequest } from "@/services/product";
import { getCategoryRequest } from "@/services/category";

export const addProduct = async (value: ProductRequest) => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("auth");
    if (!session) redirect("/login");
    await addProductRequest({ ...value, sessionId: session.value });
    redirect("/products");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      return {
        msg: error.message,
      };
    }
    return {
      msg: String(error),
    };
  }
};

export const getCategories = async () => {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");
    if (!auth) redirect("/login");
    const result = await getCategoryRequest({ sessionId: auth.value });

    return {
      err: false,
      ...result,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      return {
        err: true,
        data: [],
        msg: error.message,
      };
    }
    return {
      err: true,
      data: [],
      msg: String(error),
    };
  }
};
