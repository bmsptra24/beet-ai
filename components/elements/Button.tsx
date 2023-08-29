"use client";
import { callbackProps, pathProps, textProps } from "@/types/types";
import "@/styles/button.css";
import { signIn } from "next-auth/react";

const Button = ({ text, callback }: textProps & callbackProps) => {
  return (
    <button
      onClick={() => callback()}
      className="bg-primary-white px-5 py-2 rounded text-primary-black text-xl press-shadow border border-primary-black transition-all ease-in-out"
    >
      {text}
    </button>
  );
};
export const ButtonLogin = () => {
  return (
    <button
      onClick={() => {
        // const session = await getServerSession(authOptions);
        //! buat logic jika user teraunticated maka dia langsung ke home, jika tidak dia akan login
        signIn();
      }}
      className="bg-primary-white px-5 py-2 rounded text-primary-black text-xl press-shadow border border-primary-black transition-all ease-in-out"
    >
      Log In
    </button>
  );
};

export default Button;
