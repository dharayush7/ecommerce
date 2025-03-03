"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyOTPsRequest } from "@/services/authentication";
import { VerifyOTPsRequest } from "@/lib/type";

export const verfyOTPs = async (value: VerifyOTPsRequest) => {
  const cookieStore = await cookies();
  const session = cookieStore.get("rest");

  if (!session) redirect("/rest-password");

  try {
    await verifyOTPsRequest({ ...value, sessionId: session.value });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
};
