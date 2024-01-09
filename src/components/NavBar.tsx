import Image from "next/image";

const NavBar = () => {
  return (
    <div className="flex justify-evenly items-center border-b">
      <Image src="/bby-logo.png" alt="logo" width={50} height={50} />
      NavBar
    </div>
  );
};

export default NavBar;
