"use client";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useNumStore } from "@/store/NumStore";
import { Dialog } from "./ui/dialog";

const NavBar = () => {
  const path = usePathname();
  const { selectedNum, setSelectedNum } = useNumStore();

  return (
    <div className="fixed z-50 flex items-center w-full h-16 overflow-auto justify-evenly bg-secondary">
      <div className="w-[10%] flex">
        {path === "/example" && (
          <Button
            className="m-4"
            onClick={() =>
              selectedNum < 50 ? setSelectedNum(selectedNum + 1) : null
            }
          >
            +
          </Button>
        )}

      </div>
      <div className="flex items-center justify-evenly w-[80%]">
        <Image src="/bby-logo.png" alt="logo" width={50} height={50} />

        <div className="flex items-center justify-center w-auto">
          BestBuy SKU Setup Portal
        </div>

        <ModeToggle />
      </div>
      <div className="flex w-[10%] justify-end">
        {path === "/example" && (
          <Button type="submit" className="m-4" form="myForm">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
