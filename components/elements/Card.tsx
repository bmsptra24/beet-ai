import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";

export const Card = ({
  title,
  platform,
  path = "#",
}: {
  title: string;
  platform: string;
  path: string;
}) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(path)}
      className="rounded-xl h-52 w-72 bg-primary-white border-primary-black border-2 press-shadow flex flex-col justify-between text-base p-5"
    >
      <div className="w-full grow flex flex-col justify-center items-center gap-3">
        <p className="text-2xl">{title}</p>
        <p>{platform}</p>
      </div>
      <div>{"</>"}</div>
    </button>
  );
};

export const CardAddproject = () => {
  return (
    <button className="rounded-xl h-52 w-72 bg-primary-white border-primary-one border-2 press-shadow flex flex-col justify-between text-base text-primary-one">
      <div className="w-full grow flex flex-col justify-center items-center gap-3">
        <AiOutlinePlus className="text-4xl" />
        <p>Add project</p>
      </div>
      <div className="h-10 w-full grid place-items-center border-t-2">
        Try the demo project
      </div>
    </button>
  );
};
