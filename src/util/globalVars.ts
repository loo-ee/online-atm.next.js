import { AccountModel, BankModel } from './types';

export const backendUrl = 'https://goldfish-app-3tklk.ondigitalocean.app';

export const nullBank: BankModel = {
  id: -1,
  bankName: 'null',
  description: 'null',
  thumbnail: '/images/null.png',
};

export const nullAccount: AccountModel = {
  accountNumber: -1,
  balance: -1,
  bank: 'null',
  name: 'null',
  pin: -1,
};
