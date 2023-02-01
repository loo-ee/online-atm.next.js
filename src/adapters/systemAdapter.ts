import { backendUrl } from '@/util/globalVars';
import { BankModel } from '@/util/types';

export async function getBanks() {
  const res = await fetch(`${backendUrl}/banks/`, { cache: 'no-store' });

  if (!res.ok) return null;

  return res.json();
}

export async function getBank() {
  const bank: BankModel = {
    id: 1,
    bankName: 'BDO',
    description: 'We find ways.',
    thumbnail: '/images/bdo.png',
  };

  return bank;
}
