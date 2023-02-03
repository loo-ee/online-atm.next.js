import { getBank, getBanks } from '@/adapters/systemAdapter';
import { backendUrl, nullAccount, nullBank } from '@/util/globalVars';
import { AccountModel, BankModel } from '@/util/types';
import BankMenu from './BankMenu';

export const dynamicParams = false;

async function fetchAccounts(email: string, bankName: string) {
  const res = await fetch(
    `${backendUrl}/accounts?email=${email}&bankName=${bankName}`,
    {
      next: { revalidate: 5 },
    }
  );

  if (!res.ok) return null;

  const accounts: AccountModel[] = await res.json();
  if (accounts.length == 0) return null;

  return accounts;
}

export default async function Bank({ params }: { params: { bank: string } }) {
  let bank: BankModel | null = await getBank(params.bank);
  let foundAccounts = await fetchAccounts('jl@fake.com', params.bank);

  if (!bank) bank = nullBank;
  if (!foundAccounts) foundAccounts = [nullAccount];

  return <BankMenu accounts={foundAccounts} bank={bank} />;
}

export async function generateStaticParams() {
  const banks: BankModel[] | null = await getBanks();

  if (!banks) return;

  return banks.map((bank) => ({
    bank: bank.bankName,
  }));
}
