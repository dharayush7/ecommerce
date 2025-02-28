import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email Invalid"),
  password: z.string().min(6, "Password should be at least 6 digit"),
});

export const adminVerificationSchema = z.object({
  userId: z.string().min(8, "UserId not valid"),
  otpCode: z.number().min(6, "Otp should be 6 charecter"),
});
