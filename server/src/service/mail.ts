import nodemailer from "nodemailer";

const smtp_host = process.env.SMTP_HOST;
const smtp_port = process.env.SMTP_PORT;
const smtp_secure = process.env.SMTP_SECURE;
const smtp_username = process.env.SMTP_USERNAME;
const smtp_pass = process.env.SMTP_PASS;

if (!smtp_host || !smtp_port || !smtp_secure || !smtp_username || !smtp_pass) {
  throw new Error("smtp credentials are not set");
}

const transporter = nodemailer.createTransport({
  host: smtp_host,
  port: Number(smtp_port),
  secure: Boolean(smtp_secure),
  auth: {
    user: smtp_username,
    pass: smtp_pass,
  },
});

export async function sendMail(email: string, code: number) {
  const res = await transporter.sendMail({
    from: `"Ayush Dhar" <${smtp_username}>`,
    to: email,
    subject: "OTP For verification",
    html: `<b>${code}</b>`,
  });
  console.log(res);
}
