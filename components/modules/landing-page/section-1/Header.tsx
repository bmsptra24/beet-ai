import { ButtonSignIn } from '@/components/elements/Button'
import logo from '@/public/logo/logo.png'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
const Header: React.FC = () => {
  return (
    <div className="justify-between items-center h-20 lg:h-28 text-lg absolute left-0 right-0 top-0 z-10 flex">
      <div>
        <img src={logo.src} alt="logo" className="w-[4rem] ml-1" />
      </div>

      <div className="justify-between gap-10 hidden md:flex">
        {/* <Link className="hover:underline" href={'#'}>
          Service
        </Link> 
        <Link className="hover:underline" href={'#'}>
          About us
        </Link>
        <Link className="hover:underline" href={'#'}>
          Work
        </Link>
        <Link className="hover:underline" href={'#'}>
          Team
        </Link> 
        <Link className="hover:underline" href={'#'}>
          Contact us
        </Link> */}
        <ButtonSignIn />
      </div>
      <div className="block md:hidden">
        <ButtonSignIn />
        {/* <GiHamburgerMenu /> */}
      </div>
    </div>
  )
}

export default Header
