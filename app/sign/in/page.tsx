"use client";
import { bricolageGrotesque, delaGothicOne } from "@/styles/fonts";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import googleIcon from "@/public/icons/google.svg";
import { signIn, useSession } from "next-auth/react";
import isEmail from "validator/lib/isEmail";
import { prismaFindUniqueUser } from "@/utils/prisma";
import { User } from "@/types/types";
import { useRouter } from "next/navigation";

const SignIn: React.FC = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const rememberMe = useRef(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.push("/home");
    const email = localStorage.getItem("email") || "";
    const password = localStorage.getItem("password") || "";
    setInput({ email, password });
  }, []);

  useEffect(() => {
    if (status === "authenticated") router.push("/home");
  }, [session]);

  const isValid = async (input: { email: string; password: string }) => {
    if (input.password === "") throw "Invalid Password!";
    if (!isEmail(input.email)) throw "Invalid Email!";
    const user: User = await prismaFindUniqueUser({ email: input.email });
    if (!user) throw "User not found!";
    if (input.password !== user.password) throw "Invalid Password!";
    if (!user.status) throw "User not verified!";
    return true;
  };

  const onSubmit = async () => {
    if (!(await isValid(input))) throw "Invalid Input!";

    if (rememberMe.current) {
      // save to local
      localStorage.setItem("email", input.email);
      localStorage.setItem("password", input.password);
    }

    await signIn("credentials", {
      email: input.email,
      password: input.password,
      redirect: false,
    });
  };
  return (
    <main className="min-h-screen relative text-xl flex items-stretch bg-primary-one">
      <section className="absolute inset-0 flex justify-center items-center ">
        <div className="h-[35rem] w-[24rem] bg-primary-white press-md rounded-lg flex flex-col justify-between items-center p-8">
          {/* welcome */}
          <p
            style={delaGothicOne.style}
            className="flex justify-center items-center min-h-[5rem] text-2xl"
          >
            Welcome Back!
          </p>
          <input
            type="text"
            value={input.email}
            className="border border-primary-black py-6 px-3 text-base w-full h-10 rounded-lg press-sm"
            placeholder="email"
            onChange={(e) =>
              setInput({ ...input, email: e.target.value.toLowerCase() })
            }
          />
          <input
            type="password"
            defaultValue={input.password}
            className="border border-primary-black py-6 px-3 text-base w-full h-10 rounded-lg press-sm"
            placeholder="password"
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <div className="flex justify-between w-full px-2 text-sm">
            <div className="flex gap-1">
              <input
                type="checkbox"
                name="remember-me"
                id="remember-me"
                className="w-4 cursor-pointer"
                onChange={() => (rememberMe.current = !rememberMe.current)}
              />
              <label htmlFor="remember-me" className="cursor-pointer">
                Remember me
              </label>
            </div>
            <Link href="#" className="underline hover:no-underline">
              Forgot password?
            </Link>
          </div>
          <button
            className="bg-primary-four w-full py-3 rounded-lg press-sm press-sm-active font-bold"
            style={bricolageGrotesque.style}
            onClick={onSubmit}
          >
            Continue
          </button>
          <div className="flex text-sm gap-1">
            <p>Dont have an account?</p>
            <Link href={"/sign/up"} className="underline hover:no-underline">
              Sign Up
            </Link>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <hr className="border-slate-400 w-full" />
            <p className="text-base text-slate-400">or</p>
            <hr className="border-slate-400 w-full" />
          </div>
          <button
            onClick={async () => {
              signIn("google", { redirect: true, callbackUrl: "/home" });
            }}
            className="flex press-sm press-sm-active rounded-lg w-full p-3 justify-center items-center relative text-base"
          >
            <img
              src={googleIcon.src}
              alt="google-icon"
              className="absolute left-3 w-7"
            />
            <p>Continue with Google</p>
          </button>
          <p className="text-xs text-center">
            by Continuing, you accept our{" "}
            <Link href={"#"} className="underline hover:no-underline">
              Terms and Conditions, Privacy Policy
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
