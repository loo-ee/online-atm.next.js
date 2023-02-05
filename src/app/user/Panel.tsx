'use client';

import { getAllAccounts } from '@/adapters/userAdapter';
import { UserContext } from '@/contexts/UserContext';
import { AccountModel } from '@/util/types';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

export default function Panel({}) {
  const User = useContext(UserContext);

  const [BDO_count, set_BDO_count] = useState(0);
  const [BPI_count, set_BPI_count] = useState(0);
  const [LANDBANK_count, set_LANDBANK_count] = useState(0);

  function getAccountsCount(accounts: AccountModel[]): void {
    let bdo = 0;
    let bpi = 0;
    let landbank = 0;

    accounts.forEach((account) => {
      switch (account.bank) {
        case 'BDO':
          bdo++;
          break;
        case 'BPI':
          bpi++;
          break;
        case 'LANDBANK':
          landbank++;
          break;
      }
    });

    set_BDO_count(bdo);
    set_BPI_count(bpi);
    set_LANDBANK_count(landbank);
  }

  async function fetchAllAcounts() {
    const foundAccounts = await getAllAccounts(User!.user.email);

    if (foundAccounts) {
      getAccountsCount(foundAccounts);
    }
  }

  useEffect(() => {
    fetchAllAcounts();
  }, []);

  return (
    <div className="laptop:p-5 bg-secondary border-4 border-black rounded-lg p-4 laptop:w-[300px] laptop:h-[300px] mt-8">
      <div className="flex flex-row justify-between bg-primary laptop:p-4 rounded">
        <div className="flex flex-col">
          <span className="text-3xl text-white">{User?.user.username}</span>
          <span className="text-md text-gray-200">{User?.user.email}</span>
        </div>

        <Image
          src="/images/account.png"
          alt="account pfp"
          width={100}
          height={100}
        />
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
