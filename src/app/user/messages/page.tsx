"use client";

import { getBanks } from "@/adapters/systemAdapter";
import { getAccounts } from "@/adapters/userAdapter";
import { UserContext } from "@/contexts/UserContext";
import { AccountModel, BankModel } from "@/util/types";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Messages() {
  const User = useContext(UserContext);

  const [banks, setReceivers] = useState<AccountModel[][]>([[]]);

  async function fetchReceivers() {
    const foundBanks: BankModel[] = await getBanks();

    foundBanks.forEach(async (bank) => {
      const receiver = await getAccounts(User!.email, bank.bankName);
      console.log(receiver);

      if (receiver) setReceivers([...banks, receiver]);
    });
  }

  useEffect(() => {
    fetchReceivers();
  }, [User?.email]);

  return banks.map((bank, index) => (
    <div key={index}>
      {bank.map((account) => (
        <Link
          href={`/user/messages/${account.accountNumber}/`}
          key={account.accountNumber}
        >
          <div
            className={
              "my-6 phone:p-2 laptop:p-5 rounded-lg text-center bg-primary"
            }
          >
            <span className="ml-4 phone:text-md laptop:text-3xl text-white">
              Messages for{" "}
              <span className="text-secondary">{account.accountNumber}</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  ));
}
