import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email Invalid"),
  password: z.string().min(6, "Password should be at least 6 digit"),
});

export const adminVerificationSchema = z.object({
  userId: z.string().min(8, "UserId not valid"),
  otpCode: z.number().min(6, "Otp should be 6 charecter"),
});

export const addManegerSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 charecters"),
  email: z.string().email("Email not valid"),
  admin: z.boolean(),
  product: z.boolean(),
  order: z.boolean(),
  payment: z.boolean(),
  customer: z.boolean(),
  site: z.boolean(),
  password: z.string().min(6, "password should be atleast 6 charecters"),
  mobileNo: z.number().min(10, "Invalid phone number"),
});

export const updateManegerSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 charecters"),
  email: z.string().email("Email not valid"),
  oldEmail: z.string().email("Old email not valid"),
});

export const updatePermisionOfManegerSchema = z.object({
  email: z.string().email("Email not valid"),
  admin: z.boolean(),
  product: z.boolean(),
  order: z.boolean(),
  payment: z.boolean(),
  customer: z.boolean(),
  site: z.boolean(),
});
