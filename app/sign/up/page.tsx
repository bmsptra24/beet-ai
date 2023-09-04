"use client";
import { bricolageGrotesque, delaGothicOne } from "@/styles/fonts";
import Link from "next/link";
import React, { useRef } from "react";
import googleIcon from "@/public/icons/google.svg";
import { prismaCreateUser, prismaCreateVerification } from "@/utils/prisma";
import { sendEmail } from "@/utils/sendEmail";
import { signIn } from "next-auth/react";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { generateCode } from "@/utils/generateNumber";

const page: React.FC = () => {
  const name = useRef("");
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");

  const onSubmit = async () => {
    console.log(password, confirmPassword);

    if (isEmpty(password.current, { ignore_whitespace: true }))
      throw "Password can't be empty!";
    if (password.current.length < 7) throw "Password must be 8 words long!";
    if (!equals(password.current, confirmPassword.current))
      throw "Invalid Password!";
    if (!isEmail(email.current)) throw "Invalid Email!";

    try {
      await prismaCreateUser({
        name: name.current,
        username: username.current,
        email: email.current,
        password: password.current,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <main className="min-h-screen relative text-xl flex items-stretch bg-primary-one">
      <section className="absolute inset-0 flex justify-center items-center ">
        <div className="h-[39rem] w-[24rem] gap-1 bg-primary-white press-md rounded-lg flex flex-col justify-between items-center p-8">
          {/* welcome */}
          <p
            style={delaGothicOne.style}
            className="flex justify-center items-center min-h-[4rem] text-2xl"
          >
            Create your account!
          </p>
          <input
            type="text"
            className="border border-primary-black py-6 px-3 text-base w-full h-10 rounded-lg press-sm"
            placeholder="your name"
            onChange={(e) => (name.current = e.target.value)}
          />
          <input
            type="text"
            className="border border-primary-black py-6 px-3 text-base w-full h-10 rounded-lg press-sm"
            placeholder="username"
            onChange={(e) => (username.current = e.target.value)}
          />
          <input
            type="text"
            className="border border-primary-black py-6 px-3 text-base w-full h-10 rounded-lg press-sm"
            placeholder="email"
            onChange={(e) => (email.current = e.target.value.toLowerCase())}
          />
          <input
            type="password"
            className="border border-primary-black py-6 px-3 text-base w-full h-10 rounded-lg press-sm"
            placeholder="password"
            onChange={(e) => (password.current = e.target.value)}
          />
          <input
            type="password"
            className="border border-primary-black py-6 px-3 text-base w-full h-10 rounded-lg press-sm"
            placeholder="confirm your password"
            onChange={(e) => (confirmPassword.current = e.target.value)}
          />
          <button
            className="bg-primary-four w-full py-3 rounded-lg press-sm press-sm-active font-bold"
            style={bricolageGrotesque.style}
            onClick={async () => {
              try {
                await onSubmit();
                const code = generateCode();
                await prismaCreateVerification({
                  code,
                  user: { connect: { email: email.current } },
                });
                await sendEmail(email.current, code);
                await signIn("credentials", {
                  email: email.current,
                  password: password.current,
                  redirect: true,
                  callbackUrl: "/sign/verification",
                });
              } catch (error) {
                throw error;
              }
            }}
          >
            Continue
          </button>
          <div className="flex text-sm gap-1">
            <p>Dont have an account?</p>
            <Link href={"/sign/in"}>Sign In</Link>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <hr className="border-slate-400 w-full" />
            <p className="text-base text-slate-400">or</p>
            <hr className="border-slate-400 w-full" />
          </div>
          <button className="flex press-sm press-sm-active rounded-lg w-full p-3 justify-center items-center relative text-base">
            <img
              src={googleIcon.src}
              alt="google-icon"
              className="absolute left-3 w-7"
            />
            <p>Continue with Google</p>
          </button>
          <p className="text-xs text-center">
            by Continuing, you accept our{" "}
            <Link href={"#"} className="underline">
              Terms and Conditions, Privacy Policy
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default page;
