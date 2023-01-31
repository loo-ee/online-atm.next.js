'use client';

import { UserContext } from '@/contexts/UserContext';
import Image from 'next/image';
import { useContext, useEffect, useRef } from 'react';

export default function Panel({}) {
  const User = useContext(UserContext);
  const BDOAccountsCount = useRef(0);
  const BPIAccountsCount = useRef(0);
  const LBAccountsCount = useRef(0);

  function getAccountsCount(): void {
    User?.user.accounts.map((account) => {
      switch (account.bank) {
        case 'BDO':
          BDOAccountsCount.current++;
          break;

        case 'BPI':
          BPIAccountsCount.current++;
          break;

        case 'LANDBANK':
          LBAccountsCount.current++;
          break;
      }
    });
  }

  useEffect(() => {
    getAccountsCount();
  });

  return (
    <div className="laptop:p-3 bg-secondary border-4 border-black rounded-lg p-4 laptop:w-[300px] laptop:h-[300px] mt-8">
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
          You have {BDOAccountsCount.current} BDO accounts.
        </div>
        <div className="bg-red-900 p-2 rounded mt-2">
          You have {BPIAccountsCount.current} BPI accounts.
        </div>
        <div className="bg-green-700 p-2 rounded mt-2">
          You have {LBAccountsCount.current} LANDBANK accounts.
        </div>
      </div>
    </div>
  );
}
