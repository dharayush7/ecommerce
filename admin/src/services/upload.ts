import axios, { AxiosError } from "axios";

const HOST = process.env.SERVER_HOST!;
const UPLOAD_TOKEN = process.env.UPLOAD_TOKEN!;

interface UploadRequest {
  url: string;
}

interface UploadResponse {
  data: {
    mediaId: string;
  };
  msg: string;
}

interface GetUnusedMediaResponse {
  msg: string;
  data: string[];
}

export const uploadRequest = async ({ url }: UploadRequest) => {
  try {
    const result = await axios.post(
      `${HOST}/admin/upload`,
      { url },
      {
        headers: {
          Authorization: `Baerer ${UPLOAD_TOKEN}`,
        },
      }
    );
    return result.data as UploadResponse;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as UploadResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const getUnusedMediaRequest = async () => {
  try {
    const result = await axios.get(`${HOST}/admin/upload/unused/get`, {
      headers: {
        Authorization: `Baerer ${UPLOAD_TOKEN}`,
      },
    });
    return result.data as GetUnusedMediaResponse;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as GetUnusedMediaResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const deleteUnusedMediaRequest = async () => {
  try {
    const result = await axios.get(`${HOST}/admin/upload/unused/delete`, {
      headers: {
        Authorization: `Baerer ${UPLOAD_TOKEN}`,
      },
    });
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
