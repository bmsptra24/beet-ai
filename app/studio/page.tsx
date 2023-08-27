import React from "react";
import { RxTriangleDown } from "react-icons/rx";
import "@/styles/button.css";

const page = () => {
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
          <div className="flex grow flex-col gap-5">
            <p className="text-4xl">Configuration</p>
            <div className="flex gap-5">
              <input
                className="press-shadow-sm grow p-2 bg-primary-white"
                type="text"
                placeholder="your-livestream-id"
              />
              <button className="flex px-3 bg-primary-white items-center justify-between press-shadow-sm press-sm">
                <p className="grow">Connect</p>
              </button>
            </div>
            <input
              className="press-shadow-sm p-2 bg-primary-white"
              type="text"
              placeholder="Your Cool Avatar Name"
            />
            <input
              className="press-shadow-sm p-2 bg-primary-white"
              type="text"
              placeholder="your-ai-rool"
            />
            <input
              className="press-shadow-sm p-2 bg-primary-white"
              type="text"
              placeholder="your-livestream-topic"
            />
            <select
              className="press-shadow-sm p-2 bg-primary-white"
              name="role"
              id="role"
            >
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="angry">Angry</option>
            </select>
            <select
              className="press-shadow-sm p-2 bg-primary-white"
              name="platform"
              id="platform"
            >
              <option value="youtube">Youtube</option>
              <option value="tiktok">Tiktok</option>
            </select>
            <select
              className="press-shadow-sm p-2 bg-primary-white"
              name="language"
              id="language"
            >
              <option value="id">Indonesia</option>
              <option value="en">Engglish</option>
            </select>
            <textarea
              className="press-shadow-sm p-2 bg-primary-white"
              placeholder="your-ai-knowlage"
            />
          </div>
          <div>
            <button className="flex text-3xl bg-primary-white px-3 items-center justify-between press-shadow-sm press-sm">
              <p className="grow">Start AI</p>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
