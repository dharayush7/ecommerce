"use server";

import { getCarousalRequest, deleteCarousalRequest } from "@/services/carousel";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getCarousels = async () => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("auth");
    if (!session) redirect("/login");
    const result = await getCarousalRequest({ sessionId: session.value });
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

        msg: String(error),
      };
    }
    return {
      err: true,
      data: [],
      msg: String(error),
    };
  }
};

export const deleteCarousels = async (carouselId: string) => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("auth");
    if (!session) redirect("/login");
    await deleteCarousalRequest({
      sessionId: session.value,
      carouselId,
    });
    redirect("/carousel");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      return {
        err: true,
        data: [],

        msg: String(error),
      };
    }
    return {
      err: true,
      data: [],
      msg: String(error),
    };
  }
};
