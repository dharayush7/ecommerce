"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const smtp_host = process.env.SMTP_HOST;
const smtp_port = process.env.SMTP_PORT;
const smtp_secure = process.env.SMTP_SECURE;
const smtp_username = process.env.SMTP_USERNAME;
const smtp_pass = process.env.SMTP_PASS;
if (!smtp_host || !smtp_port || !smtp_secure || !smtp_username || !smtp_pass) {
    throw new Error("smtp credentials are not set");
}
const transporter = nodemailer_1.default.createTransport({
    host: smtp_host,
    port: Number(smtp_port),
    secure: Boolean(smtp_secure),
    auth: {
        user: smtp_username,
        pass: smtp_pass,
    },
});
function sendMail(email, code) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield transporter.sendMail({
            from: `"Ayush Dhar" <${smtp_username}>`,
            to: email,
            subject: "OTP For verification",
            html: `<b>${code}</b>`,
        });
        console.log(res);
    });
}
