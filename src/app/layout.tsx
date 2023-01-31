import UserContextProvider from '@/contexts/UserContext';
import './globals.css';
import Header from './Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col bg-primary">
        <UserContextProvider>
          <Header />

          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
