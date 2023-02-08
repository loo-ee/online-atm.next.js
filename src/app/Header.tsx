"use client";

import { UserContext } from "@/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Header({}) {
  const User = useContext(UserContext);

  const [profileImgSrc, setProfileImgSrc] = useState("/images/account.png");

  useEffect(() => {
    if (User?.avatar) setProfileImgSrc(User.avatar);
  }, [User?.avatar]);

  return (
    <div
      id="header"
      className="flex flex-row justify-between border-b-4 border-black items-center pb-3 w-full fixed bg-secondary z-50"
    >
      <div className="flex flex-row w-full items-center">
        <Link href="/user/" className="flex flex-row ml-3 mt-3">
          <Image
            src="/images/money-transfer.png"
            alt="money transfer image"
            width={60}
            height={60}
          />

          <span className="text-u_darkblue ml-5 laptop:text-5xl tablet:text-2xl phone:text-md">
            ATM Service
          </span>
        </Link>
      </div>
      <div className="flex flex-row justify-between phone:w-20 laptop:w-72 mx-7">
        <Image
          src="/images/protect.png"
          alt="money protection"
          width={60}
          height={60}
          className="laptop:flex phone:hidden"
        />

        <Link href="/user/profile/">
          <Image
            src={profileImgSrc}
            alt="money protection"
            width={60}
            height={60}
            className="rounded-full mt-3 phone:mr-12"
          />
        </Link>
      </div>
    </div>
  );
}
