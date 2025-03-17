import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div>
      <Image src={"/logo.svg"} width={80} height={80} />
      <ul className="">
        <li className="">Dashboard</li>
        <li className="">Questions</li>
        <li className="">Upgrade</li>
        <li className="">How it works?</li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
