import { getBank, getBanks } from '@/adapters/systemAdapter';
import { BankModel } from '@/util/types';
import Image from 'next/image';

export const dynamicParams = false;

export default async function Bank({ params }: { params: { bank: string } }) {
  const bank = await getBank();

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
  };

  return (
    <div className="phone:p-2 laptop:p-4">
      <div className="flex flex-row justify-evenly items-start">
        <div
          className={
            'phone:w-[150px] laptop:w-[300px] phone:mb-2 laptop:mb-6 p-3 rounded-lg' +
            colorScheme[params.bank as keyof typeof colorScheme].primaryColor
          }
        >
          <span className="text-white phone:text-lg laptop:text-3xl font-bold">
            Connected to {params.bank}
          </span>
        </div>

        <div
          className={
            'text-white p-3 rounded-lg phone:w-[50px] laptop:w-[150px] h-12' +
            colorScheme[params.bank as keyof typeof colorScheme].primaryColor
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
            colorScheme[params.bank as keyof typeof colorScheme].primaryColor
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
          colorScheme[params.bank as keyof typeof colorScheme].primaryColor
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
            {params.bank}
          </span>
          <Image
            src={bank.thumbnail}
            alt="bank thumbnail"
            width={40}
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

export async function generateStaticParams() {
  const banks: BankModel[] | null = await getBanks();

  if (!banks) return;

  return banks.map((bank) => ({
    bank: bank.bankName,
  }));
}
