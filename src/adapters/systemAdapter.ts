import { backendUrl } from '@/util/globalVars';

export async function getBanks() {
  const res = await fetch(`${backendUrl}/banks/`, { cache: 'no-store' });

  if (!res.ok) return null;

  return res.json();
}
