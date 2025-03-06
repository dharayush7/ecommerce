import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProductByIdRequest } from "@/services/product";

export const getProductbyId = async (productId: string) => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("auth");
    if (!session) redirect("/login");
    const result = await getProductByIdRequest({
      productId,
      sessionId: session.value,
    });
    return {
      data: result.data.images,
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
