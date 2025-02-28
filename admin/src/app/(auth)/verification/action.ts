"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verificationRequest } from "@/services/authentication";

export const verfication = async ({ otpCode }: { otpCode: string }) => {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("id");

    if (!userId) redirect("/login");
    const response = await verificationRequest({
      otpCode,
      userId: userId.value,
    });

    cookieStore.delete("id");
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    cookieStore.set("auth", response.sessionId, {
      expires,
    });
    cookieStore.set("permission", response.permission.join(","), { expires });
    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
};
