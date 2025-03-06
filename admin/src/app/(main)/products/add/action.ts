"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ProductRequest } from "@/lib/type";
import { addProductRequest } from "@/services/product";

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
