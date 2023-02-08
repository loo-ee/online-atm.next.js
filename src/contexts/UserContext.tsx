"use client";

import { UserModel } from "@/util/types";
import React, { useState } from "react";

export interface UserContextProp {
  username: string;
  password: string;
  email: string;
  avatar: string;
  lastLogin: string;
  isAdmin: boolean;

  setUser: (user: UserModel) => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  setLastLogin: React.Dispatch<React.SetStateAction<string>>;
  setAdminState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = React.createContext<UserContextProp | null>(null);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  function setUser(user: UserModel) {
    setUsername(user.username);
    setPassword(user.password);
    setEmail(user.email);
    setAvatar(user.avatar);
    setLastLogin(user.lastLogin);
    setAdminState(user.isAdmin);
  }

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string>("/images/null.png");
  const [lastLogin, setLastLogin] = useState<string>("");
  const [isAdmin, setAdminState] = useState(false);

  const User: UserContextProp = {
    username: userName,
    password: password,
    email: email,
    avatar: avatar,
    isAdmin: isAdmin,
    lastLogin: lastLogin,

    setUser: setUser,
    setUsername: setUsername,
    setPassword: setPassword,
    setEmail: setEmail,
    setAvatar: setAvatar,
    setAdminState: setAdminState,
    setLastLogin: setLastLogin,
  };

  return <UserContext.Provider value={User}>{children}</UserContext.Provider>;
}
