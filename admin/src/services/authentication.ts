import { VerifyOTPsRequest } from "@/lib/type";
import axios, { AxiosError } from "axios";

interface LoginResponse {
  msg: string;
  userId: string;
}

interface VerficationResponse {
  sessionId: string;
  permission: string[];
  msg: string;
}

interface RestPasswordResponse {
  restSessionId: string;
  msg: string;
}

interface ResendResponse {
  msg: string;
}

interface GeneralResponse {
  msg: string;
}

const HOST = process.env.SERVER_HOST!;

export const loginRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const data = await axios.post(`${HOST}/admin/auth/login`, {
      email,
      password,
    });

    return data.data as LoginResponse;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as LoginResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const verificationRequest = async ({
  otpCode,
  userId,
}: {
  otpCode: string;
  userId: string;
}) => {
  try {
    const data = await axios.post(`${HOST}/admin/auth/verification`, {
      otp: otpCode,
      userId,
    });

    return data.data as VerficationResponse;
  } catch (error) {
    console.log(error);
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as VerficationResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const resendRequest = async (userId: string) => {
  try {
    const data = await axios.post(`${HOST}/admin/auth/resend`, {
      userId,
    });

    return data.data as ResendResponse;
  } catch (error) {
    console.log(error);
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as VerficationResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const restPassword = async (email: string) => {
  try {
    const data = await axios.post(`${HOST}/admin/auth/forget-password`, {
      email,
    });

    return data.data as RestPasswordResponse;
  } catch (error) {
    console.log(error);
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as RestPasswordResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

interface VerifyOTPsRequestBody extends VerifyOTPsRequest {
  sessionId: string;
}

export const verifyOTPsRequest = async ({
  sessionId,
  ...body
}: VerifyOTPsRequestBody) => {
  try {
    const data = await axios.post(
      `${HOST}/admin/auth/verify-opts`,
      {
        ...body,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      }
    );

    return data.data as GeneralResponse;
  } catch (error) {
    console.log(error);
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as GeneralResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};

export const chnagePasswordRequest = async ({
  password,
  sessionId,
}: {
  password: string;
  sessionId: string;
}) => {
  try {
    const data = await axios.post(
      `${HOST}/admin/auth/change-password`,
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      }
    );

    return data.data as GeneralResponse;
  } catch (error) {
    console.log(error);
    const e = error as AxiosError;
    if (e.response) {
      const res = e.response.data as GeneralResponse;
      throw new Error(res.msg);
    }
    throw new Error("Unknown error occoured");
  }
};
