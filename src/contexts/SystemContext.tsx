'use client';

import React, { useState } from 'react';

export interface SystemContextProp {
  transactionMode: string;
  setTransactionMode: React.Dispatch<React.SetStateAction<string>>;
}

export const SystemContext = React.createContext<SystemContextProp | null>(
  null
);

export default function SystemContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactionMode, setTransactionMode] = useState('deposit');

  const System: SystemContextProp = {
    transactionMode: transactionMode,
    setTransactionMode: setTransactionMode,
  };

  return (
    <SystemContext.Provider value={System}>{children}</SystemContext.Provider>
  );
}
