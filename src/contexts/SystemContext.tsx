'use client';

import { nullBank } from '@/util/globalVars';
import { BankModel } from '@/util/types';
import React, { useState } from 'react';

export interface SystemContextProp {
  selectedBank: BankModel;
  setSelectedBank: React.Dispatch<React.SetStateAction<BankModel>>;
  banks: BankModel[];
  setBanks: React.Dispatch<React.SetStateAction<BankModel[]>>;
}

export const SystemContext = React.createContext<SystemContextProp | null>(
  null
);

export default function SystemContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [banks, setBanks] = useState([nullBank, nullBank]);
  const [selectedBank, setSelectedBank] = useState(nullBank);

  const System: SystemContextProp = {
    banks: banks,
    setBanks: setBanks,
    selectedBank: selectedBank,
    setSelectedBank: setSelectedBank,
  };

  return (
    <SystemContext.Provider value={System}>{children}</SystemContext.Provider>
  );
}
