"use client";
import { pathProps, textProps } from "@/types/types";
import "@/styles/button.css";
import { useRouter } from "next/navigation";

const Button = ({ text, path }: textProps & pathProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(path)}
      className="bg-primary-white px-5 py-2 rounded text-primary-black text-xl press-shadow border border-primary-black transition-all ease-in-out"
    >
      {text}
    </button>
  );
};

export default Button;
