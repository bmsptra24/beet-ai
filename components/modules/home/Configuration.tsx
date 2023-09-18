import React, { ReactNode } from 'react'
import { RxTriangleDown } from 'react-icons/rx'

type InputProp = {
  placeholder: string
}

type DropdownProp = {
  children: ReactNode
  placeholder: string
}

type TextareaProp = {
  placeholder: string
}

const Configuration = () => {
  const Input: React.FC<InputProp> = ({ placeholder }) => {
    return (
      <input
        type="text"
        placeholder={placeholder}
        className="border-2 border-primary-black rounded w-full p-2 bg-transparent"
      />
    )
  }
  const Dropdown: React.FC<DropdownProp> = ({ children, placeholder }) => {
    return (
      <select className="border-2 border-primary-black rounded w-full p-2 bg-transparent">
        {children}
      </select>
    )
  }
  const Textarea: React.FC<TextareaProp> = ({ placeholder }) => {
    return (
      <textarea
        className={`border-2 border-primary-black rounded w-full p-2 bg-transparent h-56 grow`}
        placeholder={placeholder}
      />
    )
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold">Configuration</p>
        <div className="bg-primary-tree flex items-center py-1 px-2 rounded press-sm press-sm-active cursor-pointer">
          <p>Minato Yamata</p>
          <RxTriangleDown />
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2 grow">
        <Input placeholder="avatar name" />
        <Input placeholder="livestream id" />
        <Input placeholder="topic" />
        <div className="flex gap-2">
          <Dropdown placeholder="">
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
          </Dropdown>
          <Dropdown placeholder="">
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
          </Dropdown>
          <Dropdown placeholder="">
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
          </Dropdown>
          <Dropdown placeholder="">
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
          </Dropdown>
        </div>
        <Textarea placeholder="ai knowladge" />
        <div className="flex justify-between gap-2">
          <button className="bg-primary-tree grow flex items-center py-1.5 px-6 rounded press-sm press-sm-active cursor-pointer">
            Test AI
          </button>
          <button className="bg-primary-two flex items-center py-1.5 px-6 rounded press-sm press-sm-active cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </>
  )
}

export default Configuration
