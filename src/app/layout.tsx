'use client';

import UserContextProvider, { UserContext } from '@/contexts/UserContext';
import './globals.css';
import Header from './Header';

import { validateSession } from '@/adapters/userAdapter';
import SystemContextProvider from '@/contexts/SystemContext';
import { UserModel } from '@/util/types';
import { Rubik } from '@next/font/google';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';

const rubik = Rubik({
  subsets: ['latin'],
  display: 'optional',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const User = useContext(UserContext);
  const navigator = useRouter();

  const [token, setToken] = useState('null');

  const fetchAuthenticatedUser = useCallback(async () => {
    if (token == '') return;

    const user: UserModel | null = await validateSession(token);
    console.log(user);

    if (user) {
      User?.setUser(user);
      navigator.push('/user/');
    }
  }, [User, navigator, token]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);

    if (!token) navigator.push('/login/');
    else {
      setToken(token);
      fetchAuthenticatedUser();
    }
  }, [fetchAuthenticatedUser, navigator]);

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
