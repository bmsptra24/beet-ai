"use server";
import nodemailer from "nodemailer";

export const sendEmail = async () => {
  try {
    // const transporter = nodemailer.createTransport({
    //   host: "sayahackerbro@gmail.com",
    //   port: 587,
    //   secure: false, // upgrade later with STARTTLS
    //   auth: {
    //     user: "username",
    //     pass: "5 @nggota keluargaku",
    //   },
    // });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bmsptra2004@gmail.com",
        pass: "ywgfbkoruoddfcye",
      },
    });

    const info = await transporter.sendMail({
      from: "bmsptra2004@gmail.com",
      to: "sbima2432@gmail.com",
      subject: "Hi",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    throw error;
  }
};
