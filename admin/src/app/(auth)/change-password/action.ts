"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { chnagePasswordRequest } from "@/services/authentication";

export const chnagePassword = async ({ password }: { password: string }) => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("rest");
    if (!session) redirect("/rest-password");
    await chnagePasswordRequest({ password, sessionId: session.value });
    cookieStore.delete("rest");
    redirect("/login");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
};
