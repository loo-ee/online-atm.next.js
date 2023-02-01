'use client';

import { getBank } from '@/adapters/systemAdapter';
import { nullBank } from '@/util/globalVars';
import { BankModel } from '@/util/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function BankMenu({}) {
  const [bankSelected, setBankSelected] = useState<BankModel>(nullBank);

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

  async function fetchBank() {
    const bankSelected: BankModel = await getBank();
    console.log(bankSelected);
    setBankSelected(bankSelected);
  }

  useEffect(() => {
    fetchBank();
  }, []);

  return (
    <div className="phone:p-2 laptop:p-4">
      <div className="flex flex-row justify-evenly items-start">
        <div
          className={
            'phone:w-[150px] laptop:w-[300px] phone:mb-2 laptop:mb-6 p-3 rounded-lg' +
            colorScheme[bankSelected?.bankName as keyof typeof colorScheme]
              .primaryColor
          }
        >
          <span className="text-white phone:text-lg laptop:text-3xl font-bold">
            Connected to {bankSelected?.bankName}
          </span>
        </div>

        <div
          className={
            'text-white p-3 rounded-lg phone:w-[50px] laptop:w-[150px] h-12' +
            colorScheme[bankSelected?.bankName as keyof typeof colorScheme]
              .primaryColor
          }
        >
          {/* <DropDownMenu
            setAccountForBankPage={setAccountForBank}
            isAccountAndPassMatched={passwordsAreMatched}
            colorScheme={colorScheme}
          /> */}
        </div>

        <div
          className={
            'text-white p-3 rounded-lg phone:w-[50px] text-center laptop:w-[130px] h-12' +
            colorScheme[bankSelected?.bankName as keyof typeof colorScheme]
              .primaryColor
          }
        >
          {/* <button onClick={() => console.log('Toggle account creation')}> */}
          <button>
            {/* <img src="" alt="" className="phone:flex laptop:hidden" /> */}
            <span className="phone:hidden laptop:flex">Add Account</span>
          </button>
        </div>
      </div>

      <div
        className={
          'phone:w-[280px] laptop:w-[600px] mt-2 rounded-lg phone:p-2 laptop:p-6 flex flex-row items-center justify-between' +
          colorScheme[bankSelected?.bankName as keyof typeof colorScheme]
            .primaryColor
        }
      >
        <div className="flex flex-col">
          <span className="text-white phone:text-md laptop:text-2xl">
            <span className="text-u_gray">Name: </span>
            {/* {accountForBank?.name} */} accountForBank.name
          </span>
          <span className="text-white phone:text-sm laptop:text-xl">
            <span className="text-u_gray">Acc #: </span>
            {/* {accountForBank?.accountNumber} */} accountNumber
          </span>
        </div>

        <div className="flex flex-row items-center">
          <span className="phone:text-xl laptop:text-5xl text-white">
            {bankSelected?.bankName}
          </span>

          <Image
            src={bankSelected!.thumbnail}
            alt="bankSelected? thumbnail"
            width={50}
            height={40}
            className="rounded ml-5"
          />
        </div>
      </div>

      {/* {arePasswordsMatched ? (
        <div className="flex flex-row justify-between phone:mt-4 laptop:mt-10">
          <ModeSelection />
          <Transaction
            account={accountForBank ? accountForBank : nullAccount}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center mt-5">
            <span className="bg-white phone:p-2 laptop:p-4 rounded-lg phone:w-[150px] laptop:w-[230px] text-center phone:text-xs laptop:text-lg">
              {headerText}
            </span>

            <div>
              <NumPad mainOperation={validateLogin} />
            </div>
          </div>
        </>
      )} */}
    </div>
  );
}
