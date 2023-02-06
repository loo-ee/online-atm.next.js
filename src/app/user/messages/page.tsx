'use client';

import { getBanks } from '@/adapters/systemAdapter';
import { getAccounts } from '@/adapters/userAdapter';
import { UserContext } from '@/contexts/UserContext';
import { nullAccount } from '@/util/globalVars';
import { AccountModel, BankModel } from '@/util/types';
import { useContext, useEffect, useState } from 'react';

export default function Messages() {
  const User = useContext(UserContext);

  const [banks, setReceivers] = useState<AccountModel[][]>([[]]);

  async function fetchReceivers() {
    const foundBanks: BankModel[] = await getBanks();

    foundBanks.forEach(async (bank) => {
      const receiver = await getAccounts(User!.user.email, bank.bankName);
      console.log(receiver);

      if (receiver) setReceivers([...banks, receiver]);
    });
  }

  useEffect(() => {
    fetchReceivers();
  }, [User?.user.email]);

  return banks.map((bank, index) => (
    <div key={index}>
      {bank.map((account) => (
        <div
          key={account.accountNumber}
          className={'my-6 phone:p-2 laptop:p-5 rounded-lg bg-primary'}
        >
          <span className="ml-4 phone:text-md laptop:text-3xl text-white">
            Messages for{' '}
            <span className="text-secondary">{account.accountNumber}</span>
          </span>
        </div>
      ))}
    </div>
  ));
}
