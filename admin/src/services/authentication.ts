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

interface ResendResponse {
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
