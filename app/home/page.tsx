'use client'
import Configuration from '@/components/modules/home/Configuration'
import Dashboard from '@/components/modules/home/Dashboard'
import { Project } from '@/types/types'
import { prismaFindManyProjects } from '@/utils/prisma'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FaStarOfLife } from 'react-icons/fa'
import { GrHomeRounded, GrConfigure } from 'react-icons/gr'
const page: React.FC = () => {
  const { data: session } = useSession()
  const [projects, setProjects] = useState<Project[]>([])
  const [navigation, setNavigation] = useState(1)
  const dummyProjects = ['Minato Yamata', 'AI Chef Yunita', 'Tsubasa']

  const getProject = async () => {
    if (!session) return
    const response = await prismaFindManyProjects({
      where: { user: { email: session?.user?.email as string } },
      select: { id: true, platform: true, livestreamTopic: true },
      orderBy: { lastOpenAt: 'desc' },
    })
    setProjects(response)
  }

  useEffect(() => {
    if (projects.length === 0) {
      getProject()
    }
  }, [projects, session])

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
          <p
            onClick={() => setNavigation(1)}
            className={`${
              navigation === 1 &&
              'bg-primary-white hover:bg-primary-white border-2 cursor-default'
            } text-sm flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-primary-one/30 border-primary-black`}
          >
            <GrHomeRounded />
            Dashboard
          </p>
          <p
            onClick={() => setNavigation(2)}
            className={`${
              navigation === 2 &&
              'bg-primary-white hover:bg-primary-white border-2 cursor-default'
            } text-sm flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-primary-one/30 border-primary-black`}
          >
            <GrConfigure />
            Configuration
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">Project</p>
          {dummyProjects.map((project, index) => {
            return (
              <p
                key={index}
                onClick={() => setNavigation(index + 3)}
                className="text-sm flex items-center gap-2 px-2 py-1.5 bg-transparent hover:bg-primary-one/30 transition-all ease-in-out cursor-pointer rounded-lg border-0 border-primary-black"
              >
                <FaStarOfLife /> {project}
              </p>
            )
          })}
        </div>
      </section>
      <section className="flex flex-col bg-primary-white py-10 px-5 gap-5 grow">
        {navigation === 1 && <Dashboard />}
        {navigation === 2 && <Configuration />}
      </section>
      <section className="flex flex-col bg-primary-seven py-10 px-5 w-60"></section>
    </main>
  )
}

export default page
