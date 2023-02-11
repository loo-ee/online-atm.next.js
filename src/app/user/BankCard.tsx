"use client";

import { BankModel } from "@/util/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BankCard({ bank }: { bank: BankModel }) {
  const navigator = useRouter();

  function onBankSelect() {
    navigator.push(`/user/${bank.bankName}`);
  }

  return (
    <div
      id={bank.bankName}
      className="bg-u_gray m-5 phone:w-64 tablet:w-80 p-3 rounded-lg border-2 border-black"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col phone:w-60">
          <span className="text-u_darkblue phone:text-md tablet:text-3xl">
            {bank.bankName}
          </span>
          <span className="mt-3">{bank.description}</span>
        </div>

        <div className="mb-4 ml-3 laptop:mr-0 phone:mr-2  laptop:w-[100px] laptop:h-[80px] phone:w-[75px] phone:h-[65px] relative">
          <Image
            src={bank.thumbnail}
            alt={bank.bankName}
            fill
            className="rounded"
          />
        </div>
      </div>

      <div className="flex flex-row justify-between items-center">
        <span className="text-u_darkblue text-xl">Active</span>
        <button
          onClick={onBankSelect}
          className="border-u_gray bg-u_darkblue text-u_gray p-2 rounded-lg w-24 phone:mt-2 laptop:mt-9"
        >
          Open
        </button>
      </div>
    </div>
  );
}
