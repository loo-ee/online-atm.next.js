import { backendUrl } from '@/util/globalVars';
import { AccountModel } from '@/util/types';

export async function getBanks() {
  const res = await fetch(`${backendUrl}/banks/`, { cache: 'no-store' });

  if (!res.ok) return null;

  return res.json();
}

export async function getBank(bankName: string) {
  const res = await fetch(`${backendUrl}/bank/?bank=${bankName}`);

  if (!res.ok) return null;

  return res.json();
}

export async function getAccounts(email: string, bankName: string) {
  const res = await fetch(
    `${backendUrl}/accounts?email=${email}&bankName=${bankName}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;

  const accounts: AccountModel[] = await res.json();
  if (accounts.length == 0) return null;

  return accounts;
}
