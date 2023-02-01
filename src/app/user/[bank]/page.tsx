import { getBank, getBanks } from '@/adapters/systemAdapter';
import { BankModel } from '@/util/types';
import BankMenu from './BankMenu';

export const dynamicParams = false;

export default async function Bank({ params }: { params: { bank: string } }) {
  const bank: BankModel | null = await getBank(params.bank);

  return <BankMenu bank={bank} />;
}

export async function generateStaticParams() {
  const banks: BankModel[] | null = await getBanks();

  if (!banks) return;

  return banks.map((bank) => ({
    bank: bank.bankName,
  }));
}
