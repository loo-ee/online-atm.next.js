import { backendUrl } from '@/util/globalVars';
import Controls from './Controls';
import Panel from './Panel';

export async function getBanks() {
  const res = await fetch(`${backendUrl}/banks/`, { cache: 'no-store' });

  if (!res.ok) return null;

  return res.json();
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mt-28 flex flex-row justify-center">
        <Controls />

        {children}

        <Panel />
      </div>
    </div>
  );
}
