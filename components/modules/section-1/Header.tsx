import Button from "@/components/elements/Button";
import logo from "@/public/icons/logo.svg";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between items-center h-28 text-lg absolute left-0 right-0 top-0 z-10">
      <div>
        <img src={logo.src} alt="logo" className="w-[8rem]" />
      </div>
      <div className="text-primary-white flex gap-10 font-black">
        <Link className="hover:underline" href={""}>
          Service
        </Link>
        <Link className="hover:underline" href={""}>
          About us
        </Link>
        <Link className="hover:underline" href={""}>
          Work
        </Link>
        <Link className="hover:underline" href={""}>
          Team
        </Link>
        <Link className="hover:underline" href={""}>
          Contact us
        </Link>
      </div>
      <div className="w-[8rem] flex justify-end">
        <Button path={"/home"} text="Log In" />
      </div>
    </div>
  );
};

export default Header;
