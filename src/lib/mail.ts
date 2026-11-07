import nodemailer from "nodemailer";
const configured = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
export async function sendMail(to: string, subject: string, html: string) {
  if (!configured()) throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASSWORD.");
  const transport = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 465), secure: process.env.SMTP_SECURE !== "false", auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
  await transport.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to, subject, html });
}
