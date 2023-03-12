'use client';

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col phone:w-[250px] laptop:w-[700px] items-center justify-center">
      <span className="phone:text-lg laptop:text-5xl flex flex-col items-center phone:mb-3 laptop:mb-8">
        User Inbox
      </span>

      {children}
    </div>
  );
}
