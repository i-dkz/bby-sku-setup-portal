import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

const NavBar = () => {
  return (
    <div className="fixed flex items-center w-full h-16 justify-evenly bg-secondary">
      <Image src="/bby-logo.png" alt="logo" width={50} height={50} />
      BestBuy SKU Setup Portal  
      <ModeToggle />
    </div>
  );
};

export default NavBar;
