import { Category } from "@/lib/type";
import axios, { AxiosError } from "axios";

const HOST = process.env.SERVER_HOST!;

interface GetCategoryResponse {
  msg: string;
  data: (Category & { count: number })[];
}

export const getCategoryRequest = async ({
  sessionId,
}: {
  sessionId: string;
}) => {
  try {
    const result = await axios.get(`${HOST}/admin/category/get`, {
      headers: {
        Authorization: `token ${sessionId}`,
      },
    });
    return result.data as GetCategoryResponse;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as GetCategoryResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const addCategoryRequest = async ({
  sessionId,
  name,
  description,
  isTag,
}: {
  sessionId: string;
  name: string;
  description: string;
  isTag: boolean;
}) => {
  try {
    const result = await axios.post(
      `${HOST}/admin/category/create`,
      {
        desc: description,
        name,
        isTag,
      },
      {
        headers: {
          Authorization: `token ${sessionId}`,
        },
      }
    );
    return result.data as { msg: string };
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as { msg: string };
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const updateCategoryRequest = async ({
  sessionId,
  name,
  description,
  categoryId,
  isTag,
}: {
  sessionId: string;
  name: string;
  description: string;
  categoryId: string;
  isTag: boolean;
}) => {
  try {
    const result = await axios.post(
      `${HOST}/admin/category/update`,
      {
        id: categoryId,
        desc: description,
        name,
        isTag,
      },
      {
        headers: {
          Authorization: `token ${sessionId}`,
        },
      }
    );
    return result.data as { msg: string };
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as { msg: string };
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};
