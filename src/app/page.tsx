'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home({}) {
  const navigator = useRouter();

  useEffect(() => {
    navigator.push('/login/');
  }, []);

  return <div className="text-5xl mt-36">Home</div>;
}
