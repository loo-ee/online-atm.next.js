import HomeLayout from '../homeLayout';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeLayout>{children}</HomeLayout>
    </>
  );
}
