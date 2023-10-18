import { ClassName, SetState } from '@/types/types'
import React, { ReactNode, useEffect } from 'react'

type InputProp = {
  placeholder: string
  state: string
  setState: SetState<string>
  className?: ClassName
}

type DropdownProp = {
  children: ReactNode
  state: string
  setState: SetState<string>
  className?: ClassName
  callback?: (event: string) => void
}

type TextareaProp = {
  placeholder: string
  state: string
  setState: SetState<string>
  className?: ClassName
}

export const Input: React.FC<InputProp> = ({
  placeholder,
  state,
  setState,
  className = '',
}) => {
  return (
    <input
      className={`${className} border border-slate-500 rounded w-full p-2 bg-transparent`}
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
    callback && callback(state)
  }, [state])

  return (
    <select
      className={`border border-slate-500 rounded w-full p-2 ${className}`}
      value={state}
      onChange={(event) => {
        setState(event.target.value)
        callback && callback(event.target.value)
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
}) => {
  return (
    <textarea
      className={`${className} border border-slate-500 rounded w-full p-2 bg-transparent h-56 grow`}
      placeholder={placeholder}
      value={state}
      onChange={(event) => {
        setState(event.target.value)
      }}
    />
  )
}
