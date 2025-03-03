"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const cookieStrore = await cookies();
  cookieStrore.delete("auth");
  cookieStrore.delete("permission");
  redirect("/login");
};
