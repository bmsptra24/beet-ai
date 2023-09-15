"use client";
import { Project } from "@/types/types";
import { prismaFindManyProjects } from "@/utils/prisma";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { GrHomeRounded, GrConfigure } from "react-icons/gr";
const page: React.FC = () => {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);

  const getProject = async () => {
    if (!session) return;
    const response = await prismaFindManyProjects({
      where: { user: { email: session?.user?.email as string } },
      select: { id: true, platform: true, livestreamTopic: true },
      orderBy: { lastOpenAt: "desc" },
    });
    setProjects(response);
  };

  useEffect(() => {
    if (projects.length === 0) {
      getProject();
    }
  }, [projects, session]);

  return (
    <main className="min-h-screen relative text-base flex bg-primary-tree/25">
      <section className="flex flex-col bg-primary-seven py-10 w-60 px-5">
        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profil"
            className="w-10 h-10 rounded-full border-2 border-primary-black"
          />
          <div>
            <p className="font-bold">Bima Saputra</p>
            <p className="text-sm">Free account</p>
          </div>
        </div>
        <div className="flex py-10 flex-col gap-2">
          <p className="font-bold">Home</p>
          <p className="text-sm flex items-center gap-2 px-2 py-1.5 bg-primary-white rounded-lg border-2 border-primary-black">
            <GrHomeRounded />
            Dashboard
          </p>
          <p className="text-sm flex items-center gap-2 px-2 py-1.5 bg-transparent rounded-lg border-0 border-primary-black">
            <GrConfigure />
            Configuration
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">Project</p>
          <p className="text-sm flex items-center gap-2 px-2 py-1.5 bg-transparent rounded-lg border-0 border-primary-black">
            <FaStarOfLife /> Minato Yamata
          </p>
          <p className="text-sm flex items-center gap-2 px-2 py-1.5 bg-transparent rounded-lg border-0 border-primary-black">
            <FaStarOfLife /> AI Chef Yunita
          </p>
          <p className="text-sm flex items-center gap-2 px-2 py-1.5 bg-transparent rounded-lg border-0 border-primary-black">
            <FaStarOfLife /> Minato Yamata
          </p>
        </div>
      </section>
      <section className="flex flex-col bg-primary-white py-10 px-5 gap-5 grow">
        <div className="flex gap-5">
          <div className="bg-primary-five px-5 py-4 rounded border-2 border-primary-black grow">
            <p className="font-bold">300 dialog</p>
          </div>
          <div className="bg-primary-five px-5 py-4 rounded border-2 border-primary-black grow">
            <p className="font-bold">5 project</p>
          </div>
        </div>
        <div className="bg-primary-five px-5 py-3 flex flex-col gap-1 rounded border-2 border-primary-black">
          <p className="font-bold">Freee trial usage</p>
          <div className="flex justify-between gap-5 items-center">
            <div className="rounded-full h-4 bg-primary-white grow border-2 border-primary-black"></div>
            <p>Rp8.900/Rp10.000</p>
          </div>
          <p>
            In order to use the OpenAI API, you need to set up a paid account.
          </p>
        </div>
        <div className="border-2 flex gap-2 items-center border-primary-black rounded-full p-3">
          <AiOutlinePlus />
          <p>New project</p>
        </div>
        <div className="grow h-0 overflow-y-scroll">
          <table className="w-full">
            <tbody className="flex flex-col gap-2">
              <tr className="border-b-2 border-primary-black grid grid-cols-3">
                <th className="font-normal text-left ml-2">Project</th>
                <th className="font-normal text-left ml-2">Platform</th>
                <th className="font-normal text-left ml-2">Last Open</th>
              </tr>
              <tr className="grid grid-cols-3 border-2 border-primary-black rounded">
                <td className="p-2 bg-primary-five rounded">Chef Minato AI</td>
                <td className="p-2 bg-primary-five">Youtube</td>
                <td className="p-2 bg-primary-five rounded">
                  08 September 2023
                </td>
              </tr>
              <tr className="grid grid-cols-3 border-2 border-primary-black rounded">
                <td className="p-2 bg-primary-five rounded">Chef Minato AI</td>
                <td className="p-2 bg-primary-five">Youtube</td>
                <td className="p-2 bg-primary-five rounded">
                  08 September 2023
                </td>
              </tr>
              <tr className="grid grid-cols-3 border-2 border-primary-black rounded">
                <td className="p-2 bg-primary-five rounded">Chef Minato AI</td>
                <td className="p-2 bg-primary-five">Youtube</td>
                <td className="p-2 bg-primary-five rounded">
                  08 September 2023
                </td>
              </tr>
              <tr className="grid grid-cols-3 border-2 border-primary-black rounded">
                <td className="p-2 bg-primary-five rounded">Chef Minato AI</td>
                <td className="p-2 bg-primary-five">Youtube</td>
                <td className="p-2 bg-primary-five rounded">
                  08 September 2023
                </td>
              </tr>
              <tr className="grid grid-cols-3 border-2 border-primary-black rounded">
                <td className="p-2 bg-primary-five rounded">Chef Minato AI</td>
                <td className="p-2 bg-primary-five">Youtube</td>
                <td className="p-2 bg-primary-five rounded">
                  08 September 2023
                </td>
              </tr>
              <tr className="grid grid-cols-3 border-2 border-primary-black rounded">
                <td className="p-2 bg-primary-five rounded">Chef Minato AI</td>
                <td className="p-2 bg-primary-five">Youtube</td>
                <td className="p-2 bg-primary-five rounded">
                  08 September 2023
                </td>
              </tr>
              <tr className="grid grid-cols-3 border-2 border-primary-black rounded">
                <td className="p-2 bg-primary-five rounded">Chef Minato AI</td>
                <td className="p-2 bg-primary-five">Youtube</td>
                <td className="p-2 bg-primary-five rounded">
                  08 September 2023
                </td>
              </tr>
              <tr className="grid grid-cols-3 border-2 border-primary-black rounded">
                <td className="p-2 bg-primary-five rounded">Chef Minato AI</td>
                <td className="p-2 bg-primary-five">Youtube</td>
                <td className="p-2 bg-primary-five rounded">
                  08 September 2023
                </td>
              </tr>
              <tr className="grid grid-cols-3 border-2 border-primary-black rounded">
                <td className="p-2 bg-primary-five rounded">Chef Minato AI</td>
                <td className="p-2 bg-primary-five">Youtube</td>
                <td className="p-2 bg-primary-five rounded">
                  08 September 2023
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="flex flex-col bg-primary-seven py-10 px-5 w-60"></section>
    </main>
  );
};

export default page;
