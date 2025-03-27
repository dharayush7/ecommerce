"use server";

import { AddCarousel } from "@/lib/type";
import { addCarousalRequest } from "@/services/carousel";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const addCarousel = async (data: AddCarousel) => {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");
    if (!auth) redirect("/login");
    await addCarousalRequest({
      sessionId: auth.value,
      ...data,
    });
    redirect("/");
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
