"use server";
import { ProductRequest } from "@/lib/type";
import { getCategoryRequest } from "@/services/category";
import {
  getProductByIdRequest,
  updateProductRequest,
} from "@/services/product";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getProductbyId = async (productId: string) => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("auth");
    if (!session) redirect("/login");
    const result = await getProductByIdRequest({
      productId,
      sessionId: session.value,
    });
    return {
      data: result.data,
      msg: result.msg,
      err: false,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      return {
        err: true,
        data: {},
        msg: error.message,
      };
    }
    return {
      err: true,
      data: {},
      msg: String(error),
    };
  }
};

export const updateProduct = async ({
  productId,
  values,
}: {
  productId: string;
  values: Omit<ProductRequest, "images">;
}) => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("auth");
    if (!session) redirect("/login");
    await updateProductRequest({
      sessionId: session.value,
      data: values,
      productId,
    });
    redirect("/products");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
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
