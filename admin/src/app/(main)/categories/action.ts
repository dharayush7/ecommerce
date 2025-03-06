"use server";
import { AddCategoryRequest } from "@/lib/type";
import {
  addCategoryRequest,
  getCategoryRequest,
  updateCategoryRequest,
} from "@/services/category";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getCategories = async () => {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");
    if (!auth) redirect("/login");
    const result = await getCategoryRequest({ sessionId: auth.value });

    return {
      err: false,
      ...result,
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

export const addCategory = async ({
  name,
  description,
}: AddCategoryRequest) => {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");
    if (!auth) redirect("/login");
    await addCategoryRequest({ sessionId: auth.value, name, description });
    redirect("/categories");
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

export const updateCategory = async ({
  categoryId,
  description,
  name,
}: AddCategoryRequest & { categoryId: string }) => {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");
    if (!auth) redirect("/login");
    await updateCategoryRequest({
      sessionId: auth.value,
      categoryId,
      description,
      name,
    });
    redirect("/categories");
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
