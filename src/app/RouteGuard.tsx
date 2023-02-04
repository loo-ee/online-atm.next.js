'use client';

import { validateSession } from '@/adapters/userAdapter';
import { UserContext } from '@/contexts/UserContext';
import { UserModel } from '@/util/types';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const User = useContext(UserContext);
  const navigator = useRouter();

  async function fetchAuthenticatedUser(token: string) {
    if (token == '') return;

    const user: UserModel | null = await validateSession(token);
    console.log(user);

    if (user) {
      User?.setUser(user);
      navigator.push('/user/');
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);

    if (!token) navigator.push('/login/');
    else fetchAuthenticatedUser(token);
  }, []);

  return <>{children}</>;
}
