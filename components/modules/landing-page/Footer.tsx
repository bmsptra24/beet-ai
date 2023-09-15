import logo from "@/public/logo/logo-white.png";
import { BsInstagram, BsYoutube, BsTiktok } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-primary-four p-6 px-8 text-primary-white flex items-center justify-between">
      <div className="flex items-center gap-6 text-xl">
        <img src={logo.src} alt="logo" className="h-9 px-3 cursor-pointer hover:opacity-80 transition-all ease-in-out" />
        <BsInstagram className="cursor-pointer hover:text-slate-300 transition-all ease-in-out" />
        <BsYoutube className="cursor-pointer hover:text-slate-300 transition-all ease-in-out" />
        <BsTiktok className="cursor-pointer hover:text-slate-300 transition-all ease-in-out" />
      </div>
      <p className="cursor-pointer hover:text-slate-300 transition-all ease-in-out">Help</p>
    </div>
  );
};

export default Footer;
