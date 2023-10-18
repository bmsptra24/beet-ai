import { initState, setProjects } from "@/store/actions/currIdProject.slice";
import { RootState } from "@/store/store";
import { Project } from "@/types/types";
import {
  prismaCreateProject,
  prismaDeleteProject,
  prismaFindManyProjects,
  prismaUniqueDeleteProject,
  prismaUpdateProject,
} from "@/utils/prisma";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HiLogout, HiOutlineTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Header, { HeaderClose } from "./Header";
import { ProjectLoading } from "@/components/loading/ProjectLoading";
const Dashboard = ({
  setNavigation,
  setIsMenuOpen,
}: {
  setNavigation: Dispatch<SetStateAction<number>>;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const { projects } = useSelector((state: RootState) => state.currProject);
  const dispatch = useDispatch();

  const getProject = async () => {
    if (!session) return;
    const response = await prismaFindManyProjects({
      where: { user: { email: session?.user?.email as string } },
      orderBy: { lastOpenAt: "desc" },
    });
    dispatch(setProjects(response));
    setIsLoading(false);
  };

  useEffect(() => {
    if (projects?.length === 0) {
      getProject();
    }
  }, [projects, session]);

  const Project: React.FC<{
    projectId: number;
    name: string;
    platform: string;
    lastOpen: string;
  }> = ({ projectId, name, platform, lastOpen }) => {
    return (
      <tr
        onClick={async () => {
          // Update last open project
          const response = await prismaUpdateProject({
            where: {
              user: { email: session?.user?.email as string },
              id: projectId,
            },
            data: {
              lastOpenAt: new Date().toJSON(),
            },
          });

          if (response === null) throw new Error("Project not found!");
          dispatch(initState({ ...response, projects }));
          setNavigation(3);
        }}
        className="grid pr-3 relative bg-primary-eight hover:brightness-95 transition-all ease-in-out cursor-pointer grid-cols-3 border-2 border-primary-black rounded"
      >
        <td className="p-2 rounded">{name}</td>
        <td className="p-2">{platform}</td>
        <td className="p-2 rounded">{lastOpen}</td>
        {/* ! eror : Error: Cannot read properties of undefined (reading 'workers') */}
        <td className="absolute right-2 top-0 bottom-0 flex items-center z-50">
          <HiOutlineTrash
            className="hover:text-red-600 text-xl transition-all ease-in-out z-20"
            onClick={async (event: Event) => {
              // Mencegah event klik dari merambat ke elemen induk (tr)
              event.stopPropagation();

              if (!confirm("Are you sure want delete this project?")) return;

              console.log({ projectId });
              await prismaUniqueDeleteProject({ where: { id: projectId } });
              return setProjects(() =>
                projects.filter((project) => project.id !== projectId)
              );
            }}
          />
        </td>
      </tr>
    );
  };

  return (
    <>
      <Header setIsMenuOpen={setIsMenuOpen} />
      <div className="flex gap-5">
        <div className="bg-primary-six px-5 py-4 rounded border-2 border-primary-black grow">
          <p className="font-bold">300 dialog</p>
        </div>
        <div className="bg-primary-six px-5 py-4 rounded border-2 border-primary-black grow">
          <p className="font-bold">{projects?.length} project</p>
        </div>
        <div
          title="log out"
          onClick={() => {
            signOut({ redirect: true, callbackUrl: "/sign/in" });
          }}
          className="hidden lg:block bg-primary-danger px-3 py-4 text-2xl rounded border-2 border-primary-black cursor-pointer hover:brightness-95"
        >
          <HiLogout />
        </div>
      </div>
      <div className="bg-primary-five px-5 py-3 flex flex-col gap-1 rounded border-2 border-primary-black">
        <p className="font-bold">Free trial usage</p>
        <div className="flex justify-between gap-5 items-center">
          <div className="rounded-full h-4 bg-primary-white grow border-2 border-primary-black"></div>
          <p>Rp8.900/Rp10.000</p>
        </div>
        <p>
          In order to use the OpenAI API, you need to set up a paid account.
        </p>
      </div>
      <div
        onClick={async () => {
          // create new project
          const {
            id,
            aiKnowlagge,
            aiRole,
            avatarName,
            language,
            livestreamTopic,
            livestreamingId,
            mood,
            platform,
          } = await prismaCreateProject({
            data: {
              user: { connect: { email: session?.user?.email as string } },
            },
          });

          dispatch(
            initState({
              id,
              aiKnowlagge,
              aiRole,
              avatarName,
              language,
              livestreamingId,
              livestreamTopic,
              mood,
              platform,
            })
          );

          setNavigation(2);
        }}
        className="border-2 flex gap-2 items-center border-primary-black hover:bg-primary-black/10 cursor-pointer transition-all ease-in-out rounded-full p-3"
      >
        <AiOutlinePlus />
        <p>New project</p>
      </div>
      <div className="grow h-0 overflow-hidden hover:overflow-y-scroll">
        <table className="w-full">
          <tbody className="flex flex-col gap-2">
            <tr className="border-b-2 border-primary-black grid grid-cols-3 pr-3">
              <th className="font-normal text-left ml-2">Project</th>
              <th className="font-normal text-left ml-2">Platform</th>
              <th className="font-normal text-left ml-2">Last Open</th>
            </tr>
            {Array(3).map((_, index) => {
              console.log("hi");

              return <ProjectLoading key={index} />;
            })}
            {isLoading === true && (
              <>
                <ProjectLoading />
                <ProjectLoading />
                <ProjectLoading />
              </>
            )}
            {isLoading === false &&
              projects.length > 0 &&
              projects.map((project, index) => {
                return (
                  <Project
                    key={index}
                    projectId={project.id as number}
                    name={project.avatarName as string}
                    platform={project.platform as string}
                    lastOpen={project.lastOpenAt?.toDateString() as string}
                  />
                );
              })}
            {isLoading === false && projects.length === 0 && (
              <p>Project empty...</p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
