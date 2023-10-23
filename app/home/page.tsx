'use client'
import { ProjectNavLoading } from '@/components/loading/ProjectLoading'
import Configuration from '@/components/modules/home/Configuration'
import Dashboard from '@/components/modules/home/Dashboard'
import { HeaderClose } from '@/components/modules/home/Header'
import Studio from '@/components/modules/home/Studio'
import { initState } from '@/store/actions/currIdProject.slice'
import { RootState } from '@/store/store'
import { Project } from '@/types/types'
import {
  prismaFindManyProjects,
  prismaFindUniqueUser,
  prismaUpdateProject,
} from '@/utils/prisma'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FaStarOfLife } from 'react-icons/fa'
import { GrHomeRounded, GrConfigure } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
const page: React.FC = () => {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const { projects, id } = useSelector((state: RootState) => state.currProject)
  const [navigation, setNavigation] = useState(1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dummyProjects = ['Minato Yamata', 'AI Chef Yunita', 'Tsubasa']
  const dispatch = useDispatch()

  useEffect(() => {
    if (projects) setIsLoading(false)
  }, [projects])

  useEffect(() => {
    if (window.screen.width > 1020) setIsMenuOpen(true)
    if (projects) setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!session) return
    const isUserValid = async () => {
      const response = await prismaFindUniqueUser({
        where: { email: session?.user?.email as string },
      })

      if (response === null)
        return signOut({ redirect: true, callbackUrl: '/sign/in' })
    }

    isUserValid()
  }, [session])

  return (
    <main className="min-h-screen relative text-base flex bg-primary-tree/25 ">
      {isMenuOpen && (
        <>
          <section className="absolute top-0 bottom-0 right-0 lg:static flex flex-col bg-primary-seven py-5 lg:py-10 w-60 px-5 z-20">
            <HeaderClose setIsMenuOpen={setIsMenuOpen} />
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
                onClick={() => {
                  setNavigation(1)
                  if (window.screen.width < 1020) setIsMenuOpen(false)
                }}
                className={`${
                  navigation === 1 &&
                  'bg-primary-white hover:bg-primary-white border-2 cursor-default'
                } text-sm flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-primary-one/30 border-primary-black`}
              >
                <GrHomeRounded />
                Dashboard
              </p>
              <p
                onClick={() => {
                  setNavigation(2)
                  if (window.screen.width < 1020) setIsMenuOpen(false)
                }}
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
              {isLoading === false &&
                projects?.length > 0 &&
                projects?.map((project, index) => {
                  return (
                    <p
                      key={index}
                      onClick={async () => {
                        // Update last open project
                        const response = await prismaUpdateProject({
                          where: {
                            user: { email: session?.user?.email as string },
                            id: project.id,
                          },
                          data: {
                            lastOpenAt: new Date().toJSON(),
                          },
                        })
                        if (window.screen.width < 1020) setIsMenuOpen(false)
                        if (response === null)
                          throw new Error('Project not found!')
                        dispatch(initState({ ...response, projects }))
                        setNavigation(3)
                      }}
                      className={`${
                        navigation === 3 &&
                        project.id === id &&
                        'bg-primary-white hover:bg-primary-white border-2 cursor-default'
                      } text-sm flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-primary-one/30 border-primary-black`}
                    >
                      <FaStarOfLife /> {project?.avatarName as string}
                    </p>
                  )
                })}
              {isLoading === false && projects?.length === 0 && (
                <p>Project empty...</p>
              )}
              {isLoading === true && (
                <>
                  <ProjectNavLoading />
                  <ProjectNavLoading />
                  <ProjectNavLoading />
                  <ProjectNavLoading />
                  <ProjectNavLoading />
                </>
              )}
            </div>
          </section>
          <section
            className="absolute inset-0 bg-primary-black/30 backdrop-blur-sm lg:hidden z-10"
            onClick={() => setIsMenuOpen(false)}
          ></section>
        </>
      )}
      <section className="flex flex-col bg-primary-white py-10 px-5 gap-5 grow">
        {navigation === 1 && (
          <Dashboard
            setNavigation={setNavigation}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}
        {navigation === 2 && <Configuration setIsMenuOpen={setIsMenuOpen} />}
        {navigation === 3 && <Studio setIsMenuOpen={setIsMenuOpen} />}
      </section>
      {/* <section className="flex flex-col bg-primary-seven py-10 px-5 w-60"></section> */}
    </main>
  )
}

export default page
