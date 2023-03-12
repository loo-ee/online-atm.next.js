import HomeLayout from '../homeLayout';

export default function AdminLayout({
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
