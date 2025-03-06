import axios, { AxiosError } from "axios";
import { Media, ProductRequest } from "@/lib/type";

interface UploadRequest {
  url: string;
}

const HOST = process.env.SERVER_HOST!;

interface UploadResponse {
  data: {
    mediaId: string;
  };
  msg: string;
}

export const uploadRequest = async ({ url }: UploadRequest) => {
  try {
    const result = await axios.post(`${HOST}/admin/upload`, { url });
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

interface AddProductRequestBody extends ProductRequest {
  sessionId: string;
}

export const addProductRequest = async ({
  sessionId,
  ...body
}: AddProductRequestBody) => {
  try {
    const result = await axios.post(
      `${HOST}/admin/product/add`,
      { ...body },
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

interface GetProductResponse extends ProductRequest {
  id: string;
  isLive: boolean;
}

interface GetProductResponseBody {
  msg: string;
  data: GetProductResponse[];
}

export const getProductRequest = async ({
  sessionId,
}: {
  sessionId: string;
}) => {
  try {
    const result = await axios.get(`${HOST}/admin/product/get`, {
      headers: {
        Authorization: `token ${sessionId}`,
      },
    });
    return result.data as GetProductResponseBody;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as GetProductResponseBody;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

interface GetProductByIdData extends Omit<ProductRequest, "images"> {
  images: Media[];
}
interface GetProductByIdResponse {
  msg: string;
  data: GetProductByIdData;
}

export const getProductByIdRequest = async ({
  sessionId,
  productId,
}: {
  sessionId: string;
  productId: string;
}) => {
  try {
    const result = await axios.get(`${HOST}/admin/product/get/${[productId]}`, {
      headers: {
        Authorization: `token ${sessionId}`,
      },
    });
    return result.data as GetProductByIdResponse;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as GetProductByIdResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const updateProductMediaRequest = async ({
  sessionId,
  productId,
  image,
}: {
  sessionId: string;
  productId: string;
  image: string[];
}) => {
  try {
    const result = await axios.post(
      `${HOST}/admin/product/update-media`,
      {
        productId,
        image,
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

export const updateProductRequest = async ({
  sessionId,
  productId,
  data,
}: {
  sessionId: string;
  productId: string;
  data: Omit<ProductRequest, "images">;
}) => {
  try {
    const result = await axios.post(
      `${HOST}/admin/product/update`,
      {
        id: productId,
        ...data,
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

interface UpdateStatusRequestBody {
  sessionId: string;
  status: boolean;
  productId: string;
}

export const updateStatusRequest = async ({
  sessionId,
  status,
  productId,
}: UpdateStatusRequestBody) => {
  try {
    const result = await axios.get(
      `${HOST}/admin/product/change-status/${productId}?status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${sessionId}`,
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
