import {
  ChangeEventHandler,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react'

export type childrenProps = {
  children: ReactNode
  color: string
}

export type textProps = {
  text: string
}

export type pathProps = {
  path: string
}

export type callbackProps = {
  callback: () => void
}

export type Authorize = {
  email: string
  password: string
} | null

export type Prompt = {
  author: string
  message: string
}

export type ClassName = HTMLAttributes<HTMLInputElement> | string

export type OnChangeInput = ChangeEventHandler<HTMLInputElement>

export type OnChangeTextarea =
  | React.ChangeEventHandler<HTMLTextAreaElement>
  | undefined

export type Placeholder =
  | InputHTMLAttributes<HTMLInputElement>
  | string
  | undefined

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export type User = {
  id?: number
  name?: string
  username?: string
  email?: string
  emailBackup?: null | string
  password?: string
  status?: boolean
  role?: string
  createdAt?: string | null
  Verification?: Verification[]
  Project?: Project[]
}

export type Verification = {
  id?: number
  code?: number
  userId?: number
  createdAt?: string | null
}

export type Project = {
  id?: number
  aiRole?: string
  aiKnowlagge?: string
  avatarName?: string
  language?: string
  livestreamTopic?: string
  livestreamingId?: string
  mood?: string
  platform?: string
  userId?: number
  createdAt?: Date | null
  lastOpenAt?: Date | null
}

export type projectProps = {
  id: number
  livestreamingId: string
  avatarName: string
  aiRole: string
  livestreamTopic: string
  mood: string
  platform: string
  language: string
  aiKnowlagge: string
  lastOpenAt: Date | null
}

export type CurrProjectProps = projectProps & {
  projects: projectProps[]
}

export type QueueProps = {
  author: string
  message: string
}[]

export type ChatsProps = {
  author: string
  message: string
}[]
export interface LiveChatMessage {
  author: string
  message: string
}
