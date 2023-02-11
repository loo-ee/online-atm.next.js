import Controls from "./user/Controls";
import Panel from "./user/Panel";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mt-28 flex phone:flex-col  laptop:flex-row laptop:items-start phone:items-center justify-center">
        <div className="phone:hidden laptop:flex">
          <Controls />
        </div>

        <div className="bg-secondary border-black border-4 tablet:w-[700px] phone:w-[300px] rounded-xl p-6 mx-6 flex flex-col items-center">
          {children}
        </div>

        <div className="phone:hidden laptop:flex">
          <Panel />
        </div>

        <div className="phone:flex laptop:hidden">
          <Controls />
        </div>
      </div>
    </div>
  );
}
