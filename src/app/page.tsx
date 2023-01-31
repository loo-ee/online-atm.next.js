'use client';

import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function Home({}) {
  const User = useContext(UserContext);

  const navigator = useRouter();

  useEffect(() => {
    if (User?.user.username == '???') {
      navigator.push('/login/');
    }
  });

  return <div className="text-5xl mt-36">Home</div>;
}
