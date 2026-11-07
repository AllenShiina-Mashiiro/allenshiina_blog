import nodemailer from "nodemailer";

const configured = () =>
  Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);

function resolveSender() {
  const authorizedUser = process.env.SMTP_USER!.trim();
  const configuredFrom = process.env.SMTP_FROM?.trim();
  if (!configuredFrom) return authorizedUser;

  const addressMatch = configuredFrom.match(/<([^<>]+)>/);
  const configuredAddress = (addressMatch?.[1] || configuredFrom).trim();
  // Many SMTP providers (including common mailbox SMTP services) only allow
  // the authenticated mailbox as the envelope/header sender.
  if (configuredAddress.toLowerCase() !== authorizedUser.toLowerCase()) {
    console.warn("[mail] SMTP_FROM does not match SMTP_USER; using the authorized SMTP_USER address.");
    return authorizedUser;
  }
  return configuredFrom;
}

export async function sendMail(to: string, subject: string, html: string) {
  if (!configured()) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASSWORD.");
  }
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });
  await transport.sendMail({
    from: resolveSender(),
    to,
    subject,
    html,
  });
}
