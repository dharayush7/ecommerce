"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { loginRequest } from "@/services/authentication";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await loginRequest({ email, password });
    const cookieStore = await cookies();
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    cookieStore.set("id", response.userId, { expires });
    redirect("/verification");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
};
