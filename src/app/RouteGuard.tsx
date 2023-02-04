'use client';

import { validateSession } from '@/adapters/userAdapter';
import { UserContext } from '@/contexts/UserContext';
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
    const user = await validateSession(token);

    if (user) {
      User?.setUser(user);
      navigator.push('/user/');
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) fetchAuthenticatedUser(token);
    else navigator.push('/login/');
  });

  return <>{children}</>;
}
