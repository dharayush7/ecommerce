import axios, { AxiosError } from "axios";
import {
  AddManegerRequest,
  Manager,
  UpdatedManegerRequest,
  UpdatedPermissionRequest,
} from "@/lib/type";

const HOST = process.env.SERVER_HOST!;

interface GetManegerResponse {
  msg: string;
  data: Manager[];
}

interface AddManegerResponse {
  msg: string;
  data: Manager;
}

export const getManegerRequest = async ({
  sessionId,
}: {
  sessionId: string;
}) => {
  try {
    const result = await axios.get(`${HOST}/admin/maneger/get`, {
      headers: {
        Authorization: `token ${sessionId}`,
      },
    });
    return result.data as GetManegerResponse;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as GetManegerResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

interface AddManegerRequestBody extends AddManegerRequest {
  sessionId: string;
}

export const addManegerRequest = async ({
  sessionId,
  ...body
}: AddManegerRequestBody) => {
  try {
    const result = await axios.post(
      `${HOST}/admin/maneger/add`,
      { ...body },
      {
        headers: {
          Authorization: `token ${sessionId}`,
        },
      }
    );
    return result.data as AddManegerResponse;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as AddManegerResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

interface UpdatedManegerRequsetBody extends UpdatedManegerRequest {
  oldEmail: string;
  sessionId: string;
}

export const updatedManegerRequset = async ({
  sessionId,
  ...body
}: UpdatedManegerRequsetBody) => {
  try {
    const result = await axios.post(
      `${HOST}/admin/maneger/update`,
      { ...body },
      {
        headers: {
          Authorization: `token ${sessionId}`,
        },
      }
    );
    return result.data as AddManegerResponse;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as AddManegerResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

interface UpdatedPermissionRequsetBody extends UpdatedPermissionRequest {
  email: string;
  sessionId: string;
}

export const updatedPermissionRequset = async ({
  sessionId,
  ...body
}: UpdatedPermissionRequsetBody) => {
  try {
    const result = await axios.post(
      `${HOST}/admin/maneger/permission/update`,
      { ...body },
      {
        headers: {
          Authorization: `token ${sessionId}`,
        },
      }
    );
    return result.data as AddManegerResponse;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as AddManegerResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const deleteManegerRequest = async ({
  email,
  sessionId,
}: {
  email: string;
  sessionId: string;
}) => {
  try {
    const result = await axios.post(
      `${HOST}/admin/maneger/delete`,
      { email },
      {
        headers: {
          Authorization: `token ${sessionId}`,
        },
      }
    );
    return result.data as AddManegerResponse;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as AddManegerResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};
