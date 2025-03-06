"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { getProductRequest } from "@/services/product";

export const getProduct = async () => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("auth");
    if (!session) redirect("/login");
    const result = await getProductRequest({ sessionId: session.value });
    return {
      ...result,
      err: false,
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
