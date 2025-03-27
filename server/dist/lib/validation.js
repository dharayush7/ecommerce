"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCarouselSchema = exports.updateCategorySchema = exports.createCategorySchema = exports.updateProductSchema = exports.addProductSchema = exports.verifyOtpSchema = exports.userLoginSchema = exports.updatePermisionOfManegerSchema = exports.updateManegerSchema = exports.addManegerSchema = exports.adminVerificationSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email Invalid"),
    password: zod_1.z.string().min(6, "Password should be at least 6 digit"),
});
exports.adminVerificationSchema = zod_1.z.object({
    userId: zod_1.z.string().min(8, "UserId not valid"),
    otpCode: zod_1.z.number().min(6, "Otp should be 6 charecter"),
});
exports.addManegerSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name should be at least 3 charecters"),
    email: zod_1.z.string().email("Email not valid"),
    admin: zod_1.z.boolean(),
    product: zod_1.z.boolean(),
    order: zod_1.z.boolean(),
    payment: zod_1.z.boolean(),
    customer: zod_1.z.boolean(),
    site: zod_1.z.boolean(),
    password: zod_1.z.string().min(6, "password should be atleast 6 charecters"),
    mobileNo: zod_1.z.number().min(10, "Invalid phone number"),
});
exports.updateManegerSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name should be at least 3 charecters"),
    email: zod_1.z.string().email("Email not valid"),
    oldEmail: zod_1.z.string().email("Old email not valid"),
});
exports.updatePermisionOfManegerSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email not valid"),
    admin: zod_1.z.boolean(),
    product: zod_1.z.boolean(),
    order: zod_1.z.boolean(),
    payment: zod_1.z.boolean(),
    customer: zod_1.z.boolean(),
    site: zod_1.z.boolean(),
});
exports.userLoginSchema = zod_1.z.object({
    mobileNo: zod_1.z.number().min(10, "Invalid phone number"),
    uid: zod_1.z.string(),
});
exports.verifyOtpSchema = zod_1.z.object({
    sessionId: zod_1.z.string(),
    mobileOtp: zod_1.z.number().min(6, "Otp should be 6 charecter"),
    emailOtp: zod_1.z.number().min(6, "Otp should be 6 charecter"),
});
exports.addProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    description2: zod_1.z.string().min(1, "Description2 is required"),
    description3: zod_1.z.string().optional(),
    points: zod_1.z.array(zod_1.z.string()).optional(),
    maxPrice: zod_1.z.number().min(0, "Max price is required"),
    sellPrice: zod_1.z.number().min(0, "Selected price is required"),
    fragrence: zod_1.z.string().optional(),
    strength: zod_1.z.string().optional(),
    preference: zod_1.z.string().optional(),
    sustainable: zod_1.z.string().optional(),
    type: zod_1.z.string().optional(),
    idealFor: zod_1.z.string().optional(),
    quantity: zod_1.z.number().optional(),
    category: zod_1.z.array(zod_1.z.string()),
    images: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.updateProductSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    description2: zod_1.z.string().min(1, "Description2 is required"),
    description3: zod_1.z.string().optional(),
    points: zod_1.z.array(zod_1.z.string()).optional(),
    maxPrice: zod_1.z.number().min(0, "Max price is required"),
    sellPrice: zod_1.z.number().min(0, "Selected price is required"),
    fragrence: zod_1.z.string().optional(),
    strength: zod_1.z.string().optional(),
    preference: zod_1.z.string().optional(),
    sustainable: zod_1.z.string().optional(),
    type: zod_1.z.string().optional(),
    idealFor: zod_1.z.string().optional(),
    quantity: zod_1.z.number().optional(),
    category: zod_1.z.array(zod_1.z.string()),
});
exports.createCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name should be at least 3 charecters"),
    desc: zod_1.z.string(),
    isTag: zod_1.z.boolean(),
});
exports.updateCategorySchema = zod_1.z.object({
    id: zod_1.z.string().min(3, "Id should not be undefined"),
    name: zod_1.z.string().min(3, "Name should be at least 3 charecters"),
    desc: zod_1.z.string(),
    isTag: zod_1.z.boolean(),
});
exports.addCarouselSchema = zod_1.z.object({
    imageId: zod_1.z.string().min(3, "Inavlid image"),
    isBlack: zod_1.z.nullable(zod_1.z.boolean()),
    position: zod_1.z.string(),
    preference: zod_1.z.string({ message: "Preference should be a number" }),
    link: zod_1.z.string(),
});
