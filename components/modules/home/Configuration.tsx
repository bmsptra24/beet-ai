import { Dropdown, Input, Textarea } from '@/components/elements/Input'
import {
  currProjectAction,
  initState,
} from '@/store/actions/currIdProject.slice'
import { RootState } from '@/store/store'
import { ClassName, Project, SetState } from '@/types/types'
import { prismaFindManyProjects, prismaUpdateProject } from '@/utils/prisma'
import { useSession } from 'next-auth/react'
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { RxTriangleDown } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
type Props = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}
const Configuration: React.FC<Props> = ({ setIsMenuOpen }) => {
  // const [projects, setProjects] = useState<Project[]>([])
  const {
    aiKnowlagge,
    aiRole,
    avatarName,
    id,
    language,
    livestreamTopic,
    livestreamingId,
    mood,
    platform,
    projects,
  } = useSelector((state: RootState) => state.currProject)

  const [currProject, setCurrProject] = useState(projects[0].id)
  const { data: session } = useSession()
  const dispatch = useDispatch()

  // useEffect(() => {
  //   // Get data project
  //   ;(async () => {
  //     const project = await prismaFindManyProjects({
  //       where: {
  //         user: { email: 'admin@prisma.io' },
  //       },
  //       orderBy: {
  //         lastOpenAt: 'desc',
  //       },
  //       take: 1,
  //     })

  //     // set state
  //     if (project === null) throw new Error('Project not found!')
  //     dispatch(setProjects(project))
  //   })()
  // }, [])

  const getProject = async () => {
    if (!session) return
    const response = await prismaFindManyProjects({
      where: { user: { email: session?.user?.email as string } },
      select: { id: true, platform: true, avatarName: true },
      orderBy: { lastOpenAt: 'desc' },
    })
    dispatch(setProjects(response))
  }

  useEffect(() => {
    if (projects.length === 0) {
      getProject()
    }
  }, [projects, session])

  console.log({
    aiKnowlagge,
    aiRole,
    avatarName,
    id,
    language,
    livestreamTopic,
    livestreamingId,
    mood,
    platform,
  })

  const {
    setAiKnowlagge,
    setAiRole,
    setAvatarName,
    setLanguage,
    setLivestreamTopic,
    setLivestreamingId,
    setMood,
    setPlatform,
    setProjects,
  } = currProjectAction

  return (
    <>
      <Header setIsMenuOpen={setIsMenuOpen} />
      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold grow">Configuration</p>
        <div>
          <Dropdown
            setState={(event) => setCurrProject(Number(event))}
            className={`bg-primary-tree flex items-center py-1 px-2 rounded press-sm cursor-pointer`}
            state={currProject.toString()}
            callback={async (id) => {
              // if (projects.length === 0) return
              // const response = await prismaUpdateProject({
              //   where: {
              //     user: { email: session?.user?.email as string },
              //     id: Number(id),
              //   },
              //   data: {
              //     lastOpenAt: new Date().toJSON(),
              //   },
              // })

              // if (response === null) throw new Error('Project not found!')

              const project = projects.find((e) => e.id === Number(id))
              // console.log({ project })

              dispatch(initState({ ...project, projects }))
            }}
          >
            {projects?.map((project, index) => {
              return (
                <option value={project.id} key={index}>
                  {project.avatarName as string}
                </option>
              )
            })}
          </Dropdown>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2 grow">
        <Input
          placeholder="Your Livestream ID"
          setState={(event) => dispatch(setLivestreamingId(event))}
          state={livestreamingId}
        />
        <Input
          placeholder="Your Cool Avatar Name"
          setState={(event) => dispatch(setAvatarName(event))}
          state={avatarName}
        />
        <Input
          placeholder="your-ai-role"
          setState={(event) => dispatch(setAiRole(event))}
          state={aiRole}
        />
        <Input
          placeholder="your-livestream-topic"
          setState={(event) => dispatch(setLivestreamTopic(event))}
          state={livestreamTopic}
        />
        <div className="flex gap-2">
          <Dropdown setState={(event) => dispatch(setMood(event))} state={mood}>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
          </Dropdown>

          <Dropdown
            setState={(event) => dispatch(setPlatform(event))}
            state={platform}
          >
            <option value="youtube">Youtube</option>
            <option value="tiktok">Tiktok</option>
          </Dropdown>

          <Dropdown
            setState={(event) => dispatch(setLanguage(event))}
            state={language}
          >
            <option value="indonesia">Indonesia</option>
            <option value="english">English</option>
          </Dropdown>
        </div>
        <Textarea
          placeholder="your-ai-knowlage"
          state={aiKnowlagge}
          setState={(event) => dispatch(setAiKnowlagge(event))}
        />
        <div className="flex justify-between gap-2">
          <button className="bg-primary-tree grow flex items-center py-1.5 px-6 rounded press-sm press-sm-active cursor-pointer">
            Test AI
          </button>
          <button
            onClick={async () => {
              try {
                await prismaUpdateProject({
                  where: { id },
                  data: {
                    aiKnowlagge,
                    aiRole,
                    avatarName,
                    id,
                    language,
                    livestreamTopic,
                    livestreamingId,
                    mood,
                    platform,
                  },
                })
                alert('Data saved!')
              } catch (error) {
                alert(error)
              }
            }}
            className="bg-primary-two flex items-center py-1.5 px-6 rounded press-sm press-sm-active cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </>
  )
}

export default Configuration
