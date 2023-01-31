import { BankModel } from '@/util/types';
import { getBanks } from '../page';

export const dynamicParams = false;

export default function Bank({ params }: { params: { bank: string } }) {
  return <div>{params.bank}</div>;
}

export async function generateStaticParams() {
  const banks: BankModel[] | null = await getBanks();

  if (!banks) return;

  return banks.map((bank) => ({
    bank: bank.bankName,
  }));
}
