import UserContextProvider from '@/contexts/UserContext';
import './globals.css';
import Header from './Header';

import { Rubik } from '@next/font/google';
import SystemContextProvider from '@/contexts/SystemContext';
import RouteGuard from './RouteGuard';

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
        <SystemContextProvider>
          <UserContextProvider>
            <Header />

            <RouteGuard>{children}</RouteGuard>
          </UserContextProvider>
        </SystemContextProvider>
      </body>
    </html>
  );
}
