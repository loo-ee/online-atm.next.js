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
        <div className="bg-secondary border-black border-4 tablet:w-[700px] phone:w-[300px] rounded-xl p-6 mx-6 flex flex-col items-center">
          {children}
        </div>

        <Panel />
      </div>
    </div>
  );
}
