import { getBanks } from '@/adapters/systemAdapter';
import { SystemContext } from '@/contexts/SystemContext';
import { BankModel } from '@/util/types';
import { useContext } from 'react';
import BankMenu from './BankMenu';

export const dynamicParams = false;

export default function Bank({ params }: { params: { bank: string } }) {
  const System = useContext(SystemContext);

  System?.banks.forEach((bank) => {
    if (bank.bankName == params.bank) {
      System.setSelectedBank(bank);
    }
  });

  return <BankMenu />;
}

export async function generateStaticParams() {
  const banks: BankModel[] | null = await getBanks();

  if (!banks) return;

  return banks.map((bank) => ({
    bank: bank.bankName,
  }));
}
