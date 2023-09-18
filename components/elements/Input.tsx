import { ClassName, SetState } from '@/types/types'
import React, { ReactNode, useEffect } from 'react'

type InputProp = {
  placeholder: string
  state: string
  setState: SetState<string>
  className?: ClassName
  callback: (event: string) => void
}

type DropdownProp = {
  children: ReactNode
  state: string
  setState: SetState<string>
  className?: ClassName
  callback: (event: string) => void
}

type TextareaProp = {
  placeholder: string
  state: string
  setState: SetState<string>
  className?: ClassName
  callback?: (event: string) => void
}

export const Input: React.FC<InputProp> = ({
  placeholder,
  state,
  setState,
  className = '',
  callback,
}) => {
  useEffect(() => {
    if (state === ' ') return
    callback(state)
  }, [state])

  return (
    <input
      className={`${className} border-2 border-primary-black rounded w-full p-2 bg-transparent`}
      type="text"
      placeholder={placeholder}
      value={state}
      onChange={async (event) => {
        setState(event.target.value)
      }}
    />
  )
}

export const Dropdown: React.FC<DropdownProp> = ({
  children,
  state,
  setState,
  className = '',
  callback,
}) => {
  useEffect(() => {
    if (state === ' ') return
    callback(state)
  }, [state])

  return (
    <select
      className={`${className} border-2 border-primary-black rounded w-full p-2 bg-transparent`}
      value={state}
      onChange={(event) => {
        setState(event.target.value)
        callback(event.target.value)
      }}
    >
      {children}
    </select>
  )
}

export const Textarea: React.FC<TextareaProp> = ({
  placeholder,
  state,
  setState,
  className = '',
  callback,
}) => {
  useEffect(() => {
    if (state === ' ') return
    if (callback === undefined) return
    callback(state)
  }, [state])

  return (
    <textarea
      className={`${className} border-2 border-primary-black rounded w-full p-2 bg-transparent h-56 grow`}
      placeholder={placeholder}
      value={state}
      onChange={(event) => {
        setState(event.target.value)
        if (callback === undefined) return
        callback(event.target.value)
      }}
    />
  )
}
