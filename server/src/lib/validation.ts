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

export const userLoginSchema = z.object({
  mobileNo: z.number().min(10, "Invalid phone number"),
  uid: z.string(),
});

export const verifyOtpSchema = z.object({
  sessionId: z.string(),
  mobileOtp: z.number().min(6, "Otp should be 6 charecter"),
  emailOtp: z.number().min(6, "Otp should be 6 charecter"),
});

export const addProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  description2: z.string().min(1, "Description2 is required"),
  description3: z.string().optional(),
  points: z.array(z.string()).optional(),
  maxPrice: z.number().min(0, "Max price is required"),
  sellPrice: z.number().min(0, "Selected price is required"),
  fragrence: z.string().optional(),
  strength: z.string().optional(),
  preference: z.string().optional(),
  sustainable: z.string().optional(),
  type: z.string().optional(),
  idealFor: z.string().optional(),
  quantity: z.number().optional(),
  category: z.array(z.string()),
  images: z.array(z.string()).optional(),
});

export const updateProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  description2: z.string().min(1, "Description2 is required"),
  description3: z.string().optional(),
  points: z.array(z.string()).optional(),
  maxPrice: z.number().min(0, "Max price is required"),
  sellPrice: z.number().min(0, "Selected price is required"),
  fragrence: z.string().optional(),
  strength: z.string().optional(),
  preference: z.string().optional(),
  sustainable: z.string().optional(),
  type: z.string().optional(),
  idealFor: z.string().optional(),
  quantity: z.number().optional(),
  category: z.array(z.string()),
});

export const createCategorySchema = z.object({
  name: z.string().min(3, "Name should be at least 3 charecters"),
  desc: z.string(),
  isTag: z.boolean(),
});

export const updateCategorySchema = z.object({
  id: z.string().min(3, "Id should not be undefined"),
  name: z.string().min(3, "Name should be at least 3 charecters"),
  desc: z.string(),
  isTag: z.boolean(),
});

export const addCarouselSchema = z.object({
  imageId: z.string().min(3, "Inavlid image"),
  isBlack: z.nullable(z.boolean()),
  position: z.string(),
  preference: z.string({ message: "Preference should be a number" }),
  link: z.string(),
});
