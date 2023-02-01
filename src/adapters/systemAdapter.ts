import { backendUrl } from '@/util/globalVars';
import { BankModel } from '@/util/types';

export async function getBanks() {
  const res = await fetch(`${backendUrl}/banks/`, { cache: 'no-store' });

  if (!res.ok) return null;

  return res.json();
}

export async function getBank(bankName: string) {
  const bank: BankModel = {
    id: 1,
    bankName: 'BDO',
    description: 'We find ways.',
    thumbnail: '/images/bdo.png',
  };

  return bank;
}

export async function getAccounts(email: string) {
  const res = await fetch(`${backendUrl}/accounts?email=${email}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  return res.json();
}
