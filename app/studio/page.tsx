import React from "react";
import { RxTriangleDown } from "react-icons/rx";
import "@/styles/button.css";
import Configuration from "@/components/modules/studio/Configuration";
import Control from "@/components/modules/studio/Control";

const page: React.FC = () => {
  return (
    <main className="min-h-screen relative text-xl flex items-stretch bg-primary-tree">
      <section className="w-72 bg-primary-one ">
        <div className="flex felx-col px-3 items-center h-14 text-primary-white border-b-2">
          <p className="">Vtuber AI</p>
        </div>
      </section>
      <section className="grow text-base">
        <div className="flex felx-col px-3 items-center h-14 text-primary-black border-b-2 border-primary-one">
          <button className="flex px-3 items-center justify-between press-shadow-sm press-sm">
            <p className="grow">Minato</p>
            <RxTriangleDown className="text-xl" />
          </button>
        </div>
        <div className="p-3 flex ">
          <Configuration />
          {/* <Control /> */}
        </div>
      </section>
    </main>
  );
};

export default page;
