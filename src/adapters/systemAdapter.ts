import { backendUrl } from '@/util/globalVars';

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
