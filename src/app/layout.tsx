import UserContextProvider from '@/contexts/UserContext';
import './globals.css';
import Header from './Header';

import { Rubik } from '@next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  display: 'optional',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rubik.className}>
      <body className="flex flex-col bg-primary">
        <UserContextProvider>
          <Header />

          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
