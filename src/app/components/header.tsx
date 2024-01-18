import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
export default function Header() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between w-10/12 mx-auto p-5 px-16">
        <div className="text-[17px]">
          <RxHamburgerMenu />
        </div>
        <p className="text-[14px] font-bold">LOGO</p>
      </div>
      <div className="flex w-10/12 h-48 bg-gradient-green mx-auto px-44 justify-end items-center">
        <p className="text-[28px] font-semibold text-white">Brokers</p>
      </div>
    </div>
  );
}
