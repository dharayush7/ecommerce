"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { restPassword } from "@/services/authentication";

export const restPasswordRequest = async (email: string) => {
  try {
    const response = await restPassword(email);
    const cookieStore = await cookies();
    const expires = new Date(Date.now() + 15 * 60 * 1000);
    cookieStore.set("rest", response.restSessionId, { expires });
    redirect("/change-password");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
};
