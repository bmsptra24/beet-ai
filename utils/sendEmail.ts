"use server";
import nodemailer from "nodemailer";

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
      text: "Hello world? || " + code,
      html: "<b>Hello world?</b> " + code,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    throw error;
  }
};
