"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const path = usePathname();
  return (
    <div className="flex justify-between items-center p-4 bg-secondary shadow-md">
      <Image src={"/logo.svg"} width={60} height={60} alt="logo" />
      <ul className="hidden md:flex gap-6">
        <li
          className={`hover:text-purple-700 hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard" && "text-purple-700 font-bold"
          }`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-purple-700 hover:font-bold transition-all cursor-pointer ${
            path == "/questions" && "text-purple-700 font-bold"
          }`}
        >
          Questions
        </li>
        <li
          className={`hover:text-purple-700 hover:font-bold transition-all cursor-pointer ${
            path == "/upgrade" && "text-purple-700 font-bold"
          }`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-purple-700 hover:font-bold transition-all cursor-pointer ${
            path == "/about" && "text-purple-700 font-bold"
          }`}
        >
          How it works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
