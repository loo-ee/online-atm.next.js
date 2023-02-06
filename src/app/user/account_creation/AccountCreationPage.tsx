'use client';

import { getBanks } from '@/adapters/systemAdapter';
import { nullBank } from '@/util/globalVars';
import { BankModel } from '@/util/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import './styles.css';

export default function AccountCreationPage({}) {
  const [bankSelected, setBankSelected] = useState(nullBank);
  const [banks, setBanks] = useState([nullBank]);

  const usernameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);

  const navigator = useRouter();

  function makeAccountCreationRequest() {}

  function cancelAccountCreation() {
    navigator.back();
  }

  function chooseBank(pressedBank: BankModel) {
    setBankSelected(pressedBank);
  }

  async function fetchBanks() {
    const banks: BankModel[] | null = await getBanks();

    if (banks) {
      setBanks(banks);
      setBankSelected(banks[0]);
    }
  }

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <div className="phone:p-2 laptop:p-4 flex flex-col items-center justify-center laptop:h-[550px]">
      <div className="dropdown mb-10 self-center relative inline-block">
        <button className="dropbtn w-[200px] bg-primary p-3 rounded hover:rounded-b-none text-white">
          Select Bank
        </button>
        <div className="dropdown-content hidden absolute w-[200px] rounded-b-lg bg-white">
          {banks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => chooseBank(bank)}
              className="text-black p-2 block w-full"
            >
              {bank.bankName}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center flex flex-row items-center justify-center phone:w-[150px] laptop:w-[400px]">
        <span className="phone:text-xl laptop:text-3xl">Account Creation</span>
        <Image
          src={bankSelected.thumbnail}
          alt="bank thumb"
          width={80}
          height={80}
          className="rounded ml-5 phone:hidden laptop:flex"
        />

        <Image
          src={bankSelected.thumbnail}
          alt="bank thumb"
          width={50}
          height={50}
          className="rounded ml-5 phone:flex laptop:hidden"
        />
      </div>

      <div className="phone:text-sm laptop:text-xl phone:mt-3 laptop:mt-5">
        <div className="flex flex-row items-center phone:my-1 laptop:my-3 justify-between">
          <label htmlFor="username">Username: </label>
          <input
            ref={usernameInput}
            id="username"
            type="text"
            placeholder="Ex. jann"
            className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
          />
        </div>

        <div className="flex flex-row items-center phone:my-2 laptop:my-3 justify-between">
          <label htmlFor="email">Email: </label>
          <input
            ref={emailInput}
            id="email"
            type="text"
            placeholder="Ex. jann@gmail.com"
            className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
          />
        </div>
      </div>

      <div className="flex flex-row justify-between mt-3">
        <button
          onClick={makeAccountCreationRequest}
          className="bg-green-500 border-2 mx-5 border-black laptop:w-[140px] rounded-lg phone:p-2 laptop:p-4 laptop:mt-5 self-center"
        >
          <span className="laptop:text-xl text-white">Submit</span>
        </button>

        <button
          onClick={cancelAccountCreation}
          className="bg-red-500 border-2 mx-5 border-black laptop:w-[140px] rounded-lg phone:p-2 laptop:p-4 laptop:mt-5 self-center"
        >
          <span className="laptop:text-xl text-white">Cancel</span>
        </button>
      </div>
    </div>
  );
}
