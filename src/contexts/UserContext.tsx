'use client';

import { UserModel } from '@/util/types';
import React, { useState } from 'react';

export interface UserContextProp {
  user: UserModel;
  setUser: React.Dispatch<React.SetStateAction<UserModel>>;
}

export const UserContext = React.createContext<UserContextProp | null>(null);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const userAcc: UserModel = {
    username: 'test',
    password: '???',
    email: '???',
    avatar: null,
    lastLogin: null,
    isAdmin: false,
  };

  const [userAccount, setUserAccount] = useState<UserModel>(userAcc);

  const User: UserContextProp = {
    user: userAccount,
    setUser: setUserAccount,
  };

  return <UserContext.Provider value={User}>{children}</UserContext.Provider>;
}
