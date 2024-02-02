"use client"
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const NavBar = () => {
  const path = usePathname();
  
  return (
    <div className="fixed z-50 flex items-center w-full h-16 justify-evenly bg-secondary">
      <div className="w-[5%]"></div>
      <div className="flex items-center justify-evenly w-[90%]">
        <Image src="/bby-logo.png" alt="logo" width={50} height={50} />
        BestBuy SKU Setup Portal
        <ModeToggle />
      </div>
      <div className="w-[5%]">{path === "/example" && <Button type="submit" className="m-4" form="myForm">Next</Button>}</div>
    </div>
  );
};

export default NavBar;
