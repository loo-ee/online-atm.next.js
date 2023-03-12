export type BankModel = {
  id: number;
  bankName: string;
  description: string;
  thumbnail: string;
};

export type UserModel = {
  email: string;
  password: string;
  avatar: string;
  lastLogin: string;
  username: string;
  isAdmin: boolean;
};

export type AccountModel = {
  bank: string;
  name: string;
  accountNumber: number;
  pin: number;
  balance: number;
};

export type AccountRequest = {
  username: string;
  userEmail: string;
  bank: string;
};

export type ChangePinRequest = {
  accountNumber: number;
  newPin: number;
  title: string;
  body: string;
};

export type MessageModel = {
  sender: string;
  receiver: string;
  title: string;
  body: string;
};
