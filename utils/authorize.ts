"use server";
import { template } from "@/components/modules/email-verification/template";
import { generateCode } from "./generateNumber";
import { prismaCreateVerification } from "./prisma";
import nodemailer from "nodemailer";

export const validation = async (
  user: any,
  credentials: Record<"password" | "email" | "csrfToken", string> | undefined
) => {
  if (user === null) return false;
  if (credentials?.csrfToken === null) return false;
  if (user?.password !== credentials?.password) return false;
  return true;
};

export const sendCode = async (email: string) => {
  const code = generateCode();
  await prismaCreateVerification({
    code,
    user: { connect: { email } },
  });
  await sendEmail(email, code);
};

export const sendEmail = async (email: string, code: number) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Hi",
      html: template(code),
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    throw error;
  }
};
