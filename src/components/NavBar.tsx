import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

const NavBar = () => {
  return (
    <div className="flex justify-evenly items-center border-b h-16">
      <Image src="/bby-logo.png" alt="logo" width={50} height={50} />
      BestBuy SKU Setup Portal  
      <ModeToggle />
    </div>
  );
};

export default NavBar;
