import React, { useRef, useState } from 'react'

export const multipleRef = <T extends HTMLElement>(quantity: number) => {
  const refs = Array(quantity)
    .fill(null)
    .map(() => useRef<T | null>(null))

  return refs
}

type StateSetter = (index: number, value: any) => void

export const multipleState = (quantity: number): [any[], StateSetter] => {
  const initialStateArray = Array(quantity).fill(undefined)
  const [states, setStates] = useState(initialStateArray)

  const setStateAtIndex: StateSetter = (index, value) => {
    setStates((prevStates) => {
      const newStates = [...prevStates]
      newStates[index] = value
      return newStates
    })
  }

  return [states, setStateAtIndex]
}
