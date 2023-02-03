'use client';

import { getAccounts } from '@/adapters/userAdapter';
import { nullAccount } from '@/util/globalVars';
import NumPad from '@/util/Numpad';
import { AccountModel, BankModel } from '@/util/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ModeSelection from './ModeSelection';
import Transactions from './Transactions';

const colorScheme = {
  BDO: {
    primaryColor: ' bg-primary',
    secondaryColor: ' bg-blue-600',
  },
  BPI: {
    primaryColor: ' bg-tertiary',
    secondaryColor: ' bg-red-400',
  },
  LANDBANK: {
    primaryColor: ' bg-green-600',
    secondaryColor: ' bg-green-400',
  },
  null: {
    primaryColor: ' bg-white',
    secondaryColor: ' bg-white',
  },
};

export default function BankMenu({ bank }: { bank: BankModel }) {
  const [accounts, setAccounts] = useState<AccountModel[]>([]);
  const [selectedAccount, setSelectedAccount] =
    useState<AccountModel>(nullAccount);
  const [authState, setAuthState] = useState(false);
  const [headerText, setHeaderText] = useState('Enter pin');

  const navigator = useRouter();

  async function fetchAccounts() {
    const foundAccounts: AccountModel[] | null = await getAccounts(
      'jl@fake.com',
      bank.bankName
    );

    if (foundAccounts) {
      setAccounts(foundAccounts);
      setSelectedAccount(foundAccounts[0]);
    }
  }

  function validateLogin(pin: number) {
    const status = pin == selectedAccount.pin;

    if (status) setAuthState(true);
    else displayWarning();
  }

  function displayWarning() {
    setHeaderText("Passwords don't match!");

    setTimeout(() => {
      setHeaderText('Please enter your pin');
    }, 5000);
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="phone:p-2 laptop:p-4">
      <div className="flex flex-row justify-evenly items-start">
        <div
          className={
            'phone:w-[150px] laptop:w-[300px] phone:mb-2 laptop:mb-6 p-3 rounded-lg' +
            colorScheme[bank.bankName as keyof typeof colorScheme].primaryColor
          }
        >
          <span className="text-white phone:text-lg laptop:text-3xl font-bold">
            Connected to {bank.bankName}
          </span>
        </div>

        <div
          className={
            'text-white p-3 rounded-lg phone:w-[50px] laptop:w-[150px] h-12' +
            colorScheme[bank.bankName as keyof typeof colorScheme].primaryColor
          }
        >
          <DropDownMenu
            bankName={bank.bankName}
            accounts={accounts}
            setAuthState={setAuthState}
            setSelectedAccount={setSelectedAccount}
          />
        </div>

        <div
          className={
            'text-white p-3 rounded-lg phone:w-[50px] text-center laptop:w-[130px] h-12' +
            colorScheme[bank.bankName as keyof typeof colorScheme].primaryColor
          }
        >
          <button onClick={() => navigator.push('/user/account_creation')}>
            {/* <img src="" alt="" className="phone:flex laptop:hidden" /> */}
            <span className="phone:hidden laptop:flex">Add Account</span>
          </button>
        </div>
      </div>

      <div
        className={
          'phone:w-[280px] laptop:w-[600px] mt-2 rounded-lg phone:p-2 laptop:p-6 flex flex-row items-center justify-between' +
          colorScheme[bank.bankName as keyof typeof colorScheme].primaryColor
        }
      >
        <div className="flex flex-col">
          <span className="text-white phone:text-md laptop:text-2xl">
            <span className="text-u_gray">Name: </span>
            {selectedAccount.name}
          </span>
          <span className="text-white phone:text-sm laptop:text-xl">
            <span className="text-u_gray">Acc #: </span>
            {selectedAccount.accountNumber}
          </span>
        </div>

        <div className="flex flex-row items-center">
          <span className="phone:text-xl laptop:text-5xl text-white">
            {bank.bankName}
          </span>

          <Image
            src={bank.thumbnail}
            alt="System? selectedBank.bankName "
            width={50}
            height={40}
            className="rounded ml-5"
          />
        </div>
      </div>

      {authState ? (
        <div className="flex flex-row justify-between phone:mt-4 laptop:mt-10">
          <ModeSelection />
          <Transactions
            account={selectedAccount ? selectedAccount : nullAccount}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center mt-5">
            <span className="bg-white phone:p-2 laptop:p-4 rounded-lg phone:w-[150px] laptop:w-[230px] text-center phone:text-xs laptop:text-lg">
              {headerText}
            </span>

            <div>
              <NumPad handleSubmit={validateLogin} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function DropDownMenu({
  bankName,
  accounts,
  setSelectedAccount,
  setAuthState,
}: {
  bankName: string;
  accounts: AccountModel[];
  setSelectedAccount: React.Dispatch<React.SetStateAction<AccountModel>>;
  setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [dropDownClick, setDropDownState] = useState(false);

  function configureBankMenu(account: AccountModel) {
    setSelectedAccount(account);
    setAuthState(false);
    setDropDownState(false);
  }

  return (
    <div className="flex flex-col items-center">
      <button onClick={() => setDropDownState(!dropDownClick)}>
        <span className="phone:hidden laptop:flex">Change Account</span>

        <Image
          src="/images/caret-down.png"
          alt="caret down"
          width={50}
          height={50}
          className="phone:flex laptop:hidden"
        />
      </button>

      {dropDownClick && (
        <div
          className={
            'phone:p-1 laptop:p-2 rounded absolute phone:w-11 laptop:w-[130px] mt-7' +
            colorScheme[bankName as keyof typeof colorScheme].secondaryColor
          }
          id="hover-element"
        >
          {accounts.map((account) => (
            <div
              key={account.accountNumber}
              className="flex flex-col hover:bg-white hover:text-black"
              onClick={() => configureBankMenu(account)}
            >
              {account.bank == bankName && (
                <button className="phone:text-xs laptop:text-lg border-b-2 border-black mt-2">
                  {account.accountNumber}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
