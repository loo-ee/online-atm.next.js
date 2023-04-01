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

  useEffect(() => {
    const fetchAuthenticatedUser = async (token: string) => {
      if (token == '') return;

      try {
        const user = await validateSession(token);

        if (user.detail != 'Invalid token.') {
          User!.setUser(user);
        } else {
          navigator.push('/login/');
        }
      } catch (error) {}
    };

    const token = localStorage.getItem('token');

    if (!token) navigator.push('/login/');
    else {
      fetchAuthenticatedUser(token);
    }
  }, []);

  return <>{children}</>;
}
