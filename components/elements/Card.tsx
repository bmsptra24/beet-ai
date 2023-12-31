import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import {
  prismaCreateProject,
  prismaFindManyProjects,
  prismaFindUniqueProject,
  prismaUpdateProject,
} from '@/utils/prisma'
import { useDispatch } from 'react-redux'
import { initState } from '@/store/actions/currIdProject.slice'

type Props = {
  id: number
  title: string
  platform: string
}

export const Card: React.FC<Props> = ({ id, title, platform }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <button
      onClick={async () => {
        // Update last open project
        await prismaUpdateProject({
          where: {
            user: { email: 'admin@prisma.io' },
            id: id,
          },
          data: {
            lastOpenAt: new Date().toJSON(),
          },
        })

        router.push('/studio')
      }}
      className="rounded-xl h-52 w-72 bg-primary-white border-primary-black border-2 press-shadow flex flex-col justify-between text-base p-5"
    >
      <div className="w-full grow flex flex-col justify-center items-center gap-3">
        <p className="text-2xl">{title}</p>
        <p>{platform}</p>
      </div>
      <div>{'</>'}</div>
    </button>
  )
}

export const CardAddproject = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  return (
    <button
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
            user: { connect: { email: 'admin@prisma.io' } },
          },
        })

        console.log({
          id,
          aiKnowlagge,
          aiRole,
          avatarName,
          language,
          livestreamTopic,
          livestreamingId,
          mood,
          platform,
        })

        // set state
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
          }),
        )

        router.push('/studio')
      }}
      className="rounded-xl h-52 w-72 bg-primary-white border-primary-one border-2 press-shadow flex flex-col justify-between text-base text-primary-one"
    >
      <div className="w-full grow flex flex-col justify-center items-center gap-3">
        <AiOutlinePlus className="text-4xl" />
        <p>Add project</p>
      </div>
      <div className="h-10 w-full grid place-items-center border-t-2">
        Try the demo project
      </div>
    </button>
  )
}
