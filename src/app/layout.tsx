'use client';

import UserContextProvider from '@/contexts/UserContext';
import './globals.css';
import Header from './Header';

import SystemContextProvider from '@/contexts/SystemContext';
import { Rubik } from '@next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const rubik = Rubik({
  subsets: ['latin'],
  display: 'optional',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigator = useRouter();

  useEffect(() => {
    navigator.push('/login/');
  }, []);

  return (
    <html lang="en" className={rubik.className}>
      <body className="flex flex-col bg-primary">
        <SystemContextProvider>
          <UserContextProvider>
            <Header />

            {children}
          </UserContextProvider>
        </SystemContextProvider>
      </body>
    </html>
  );
}
