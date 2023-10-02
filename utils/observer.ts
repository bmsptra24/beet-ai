import { Dispatch, MutableRefObject, SetStateAction } from 'react'

const observer = (
  ref: MutableRefObject<Element | null>,
  setIsInViewPortState: (value: any) => void,
) => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setIsInViewPortState(true)
    }
  })

  if (ref.current) {
    observer.observe(ref.current)
  }

  // Membersihkan observer ketika komponen unmounted
  return () => {
    if (ref.current) {
      observer.unobserve(ref.current)
    }
    observer.disconnect()
  }
}

export default observer
