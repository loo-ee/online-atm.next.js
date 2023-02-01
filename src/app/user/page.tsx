import { SystemContext } from '@/contexts/SystemContext';
import { BankModel } from '@/util/types';
import Image from 'next/image';
import { useContext } from 'react';
import BankCard from './BankCard';
import { getBanks } from './layout';

export default async function UserPage({}) {
  const banks: BankModel[] | null = await getBanks();
  const System = useContext(SystemContext);

  if (banks) System?.setBanks(banks);

  return (
    <div className="flex flex-col tablet:w-[300px] laptop:w-[700px] phone:w-[100px] items-center">
      <div className="flex flex-col items-center">
        <Image
          src="/images/user-ui-banner.jpg"
          alt="banner"
          width={600}
          height={200}
          className="rounded-lg mb-6 phone:hidden tablet:flex"
        />

        <div>
          <span className="phone:mt-3 tablet:mt-7 self-start text-black phone:text-2xl tablet:text-4xl phone:self-center laptop:self-start laptop:ml-5">
            Banks Linked
          </span>
        </div>

        <div className="grid laptop:grid-flow-col overflow-x-scroll phone:h-[400px] phone:w-[3000px] tablet:h-[300px] tablet:w-[650px] phone:grid-flow-row phone:justify-center laptop:justify-start scrollbar-thin">
          {banks!.map((bank) => (
            <BankCard bank={bank} key={bank.bankName} />
          ))}
        </div>
      </div>
    </div>
  );
}
