"use client";
import { callbackProps, pathProps, textProps } from "@/types/types";
import "@/styles/button.css";
import { useRouter } from "next/navigation";
import { HTMLAttributes, ReactNode } from "react";

type buttonProps = {
  text: ReactNode;
  className?: string;
} & callbackProps;

const Button: React.FC<buttonProps> = ({ text, callback, className = "" }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => callback()}
      className={`${className} bg-primary-white px-5 py-2 rounded text-primary-black text-xl press-shadow border border-primary-black transition-all ease-in-out`}
    >
      {text}
    </button>
  );
};
export const ButtonSignIn = () => {
  const router = useRouter();
  return (
    <Button
      text="Log In"
      callback={() => {
        // const session = await getServerSession(authOptions);
        //! buat logic jika user teraunticated maka dia langsung ke home, jika tidak dia akan login
        router.push("/sign/in");
      }}
      className="bg-primary-white px-5 py-2 rounded text-primary-black text-xl press-shadow border border-primary-black transition-all ease-in-out"
    />
  );
};
export const ButtonSignUp = () => {
  const router = useRouter();
  return (
    <Button
      text="Get Started"
      callback={() => {
        router.push("/sign/up");
      }}
      className="bg-primary-white px-5 py-2 rounded text-primary-black text-xl press-shadow border border-primary-black transition-all ease-in-out"
    />
  );
};

export default Button;
