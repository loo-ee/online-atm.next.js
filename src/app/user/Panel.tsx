"use client";

import { getAllAccounts } from "@/adapters/userAdapter";
import { UserContext } from "@/contexts/UserContext";
import { AccountModel } from "@/util/types";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Panel({}) {
  const User = useContext(UserContext);

  const [imageSrc, setImageSrc] = useState("/images/account.png");
  const [BDO_count, set_BDO_count] = useState(0);
  const [BPI_count, set_BPI_count] = useState(0);
  const [LANDBANK_count, set_LANDBANK_count] = useState(0);

  function getAccountsCount(accounts: AccountModel[]): void {
    let bdo = 0;
    let bpi = 0;
    let landbank = 0;

    accounts.forEach((account) => {
      switch (account.bank) {
        case "BDO":
          bdo++;
          break;
        case "BPI":
          bpi++;
          break;
        case "LANDBANK":
          landbank++;
          break;
      }
    });

    set_BDO_count(bdo);
    set_BPI_count(bpi);
    set_LANDBANK_count(landbank);
  }

  async function fetchAllAcounts() {
    const foundAccounts = await getAllAccounts(User!.email);

    if (foundAccounts) {
      getAccountsCount(foundAccounts);
    }
  }

  function trimString(text: string | undefined) {
    if (!text) return "";
    if (text.length >= 5) text = text.substring(0, 7) + "...";

    return text;
  }

  useEffect(() => {
    fetchAllAcounts();
  }, [User?.email]);

  useEffect(() => {
    if (User?.avatar) setImageSrc(User.avatar);
  }, [User?.avatar]);

  return (
    <div className="laptop:p-5 bg-secondary border-4 border-black rounded-xl p-4 w-[300px] laptop:h-[300px] phone:h-[250px] mt-8">
      <div className="flex flex-row justify-between bg-primary laptop:p-4 rounded p-3">
        <div className="flex flex-col">
          <span className="text-3xl text-white">
            {trimString(User?.username)}
          </span>
          <span className="text-md text-gray-200">
            {trimString(User?.email)}
          </span>
        </div>

        <Link href="/user/profile/">
          <div className="laptop:w-[100px] laptop:h-[100px] phone:w-[60px] phone:h-[60px] relative">
            <Image
              src={imageSrc}
              alt="account pfp"
              fill
              className="rounded-full"
            />
          </div>
        </Link>
      </div>

      <div className="text-xs flex flex-col text-start text-white laptop:mt-2">
        <div className="bg-blue-900 p-2 rounded mt-2">
          You have {BDO_count} BDO accounts.
        </div>
        <div className="bg-red-900 p-2 rounded mt-2">
          You have {BPI_count} BPI accounts.
        </div>
        <div className="bg-green-700 p-2 rounded mt-2">
          You have {LANDBANK_count} LANDBANK accounts.
        </div>
      </div>
    </div>
  );
}
