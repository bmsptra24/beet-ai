import { ButtonSignIn } from '@/components/elements/Button'
import logo from '@/public/logo/logo.png'
import logoBlack from '@/public/logo/logo-black.png'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}
const Header: React.FC<Props> = ({ setIsMenuOpen }) => {
  return (
    <>
      <section className="lg:hidden flex justify-between items-center text-lg">
        <div>
          <img src={logo.src} alt="logo" className="w-[4rem] ml-1" />
        </div>

        <GiHamburgerMenu onClick={() => setIsMenuOpen(true)} />
      </section>
      {/* <section className="absolute top-0 bottom-0 right-0 left-16 bg-primary-tree"></section> */}
    </>
  )
}

export const HeaderClose: React.FC<Props> = ({ setIsMenuOpen }) => {
  return (
    <>
      <section className="lg:hidden flex justify-between items-center text-lg mb-5">
        <div>
          <img
            src={logoBlack.src}
            alt="logo-black"
            className="w-[4rem] ml-1 "
          />
        </div>
        <GrClose onClick={() => setIsMenuOpen(false)} />
      </section>
      {/* <section className="absolute top-0 bottom-0 right-0 left-16 bg-primary-tree"></section> */}
    </>
  )
}

export default Header
