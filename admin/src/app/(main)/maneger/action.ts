"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import {
  getManegerRequest,
  addManegerRequest,
  updatedManegerRequset,
  updatedPermissionRequset,
  deleteManegerRequest,
} from "@/services/maneger";
import {
  AddManegerRequest,
  UpdatedManegerRequest,
  UpdatedPermissionRequest,
} from "@/lib/type";

export const getManeger = async () => {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");
    if (!auth) redirect("/login");
    const result = await getManegerRequest({ sessionId: auth.value });

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

export const addManeger = async (values: AddManegerRequest) => {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");
    if (!auth) redirect("/login");
    await addManegerRequest({
      sessionId: auth.value,
      ...values,
    });
    redirect("/maneger");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      return {
        err: true,
        data: {},
        msg: error.message,
      };
    }
    return {
      err: true,
      data: {},
      msg: String(error),
    };
  }
};

interface UpdateManegerProps extends UpdatedManegerRequest {
  oldEmail: string;
}

export const updateManeger = async (values: UpdateManegerProps) => {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");
    if (!auth) redirect("/login");
    await updatedManegerRequset({
      sessionId: auth.value,
      ...values,
    });
    redirect("/maneger");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      return {
        err: true,
        data: {},
        msg: error.message,
      };
    }
    return {
      err: true,
      data: {},
      msg: String(error),
    };
  }
};

interface UpdatePermissionProps extends UpdatedPermissionRequest {
  email: string;
}

export const updatedPermission = async (values: UpdatePermissionProps) => {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");
    if (!auth) redirect("/login");
    await updatedPermissionRequset({
      sessionId: auth.value,
      ...values,
    });
    redirect("/maneger");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      return {
        err: true,
        data: {},
        msg: error.message,
      };
    }
    return {
      err: true,
      data: {},
      msg: String(error),
    };
  }
};

export const deleteManeger = async (email: string) => {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");
    if (!auth) redirect("/login");
    await deleteManegerRequest({
      sessionId: auth.value,
      email,
    });
    redirect("/maneger");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      return {
        err: true,
        data: {},
        msg: error.message,
      };
    }
    return {
      err: true,
      data: {},
      msg: String(error),
    };
  }
};
