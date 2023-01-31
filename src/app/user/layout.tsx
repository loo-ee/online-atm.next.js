import Controls from './Controls';
import Panel from './Panel';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mt-28 flex flex-row">
        <Controls />

        {children}

        <Panel />
      </div>
    </div>
  );
}
