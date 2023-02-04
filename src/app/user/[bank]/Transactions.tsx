'use client';

import {
  createMessage,
  findAccount,
  updateAccount,
} from '@/adapters/userAdapter';
import { SystemContext } from '@/contexts/SystemContext';
import Message from '@/util/Message';
import NumPad from '@/util/Numpad';
import { AccountModel, MessageModel } from '@/util/types';
import { useRouter } from 'next/navigation';
import { useContext, useState, useRef } from 'react';
import PinChange from './PinChange';

export default function Transactions({ account }: { account: AccountModel }) {
  const System = useContext(SystemContext);
  const navigator = useRouter();

  const [withdrawHeaderText, setWithdrawHeaderText] = useState(
    'Input amount to withdraw'
  );
  const [isAccountFound, setIsAccountFound] = useState(false);
  const [amountToTransfer, setAmountToTransfer] = useState(0);
  const [accountToReceive, setAccountToReceive] = useState<AccountModel | null>(
    null
  );
  const [isReadyForTransfer, setIsReadyForTransfer] = useState(false);
  const messageField = useRef<HTMLInputElement>(null);

  const deposit = async (moneyDeposit: number) => {
    account.balance += moneyDeposit;
    await updateAccount(account);

    const message: MessageModel = {
      sender: 'Admin',
      receiver: account.accountNumber.toString(),
      title: 'Account Deposit Status',
      body: `You have successfully deposited ${moneyDeposit} to your account [${account.accountNumber}].`,
    };

    await createMessage(message);
  };

  const withdraw = async (deduction: number) => {
    if (account.balance < deduction) {
      setWithdrawHeaderText('Insufficient balance!');

      setTimeout(() => {
        setWithdrawHeaderText('Input amount to withdraw');
      }, 2000);

      return;
    }

    account.balance -= deduction;
    await updateAccount(account);

    const message: MessageModel = {
      sender: 'Admin',
      receiver: account.accountNumber.toString(),
      title: 'Account Withdrawal Status',
      body: `You have successfully withdrawn ${deduction} from your account [${account.accountNumber}].`,
    };

    await createMessage(message);
  };

  const validateAccount = async (accountNumber: number) => {
    const foundAccount: AccountModel = await findAccount(accountNumber);

    if (!foundAccount) {
      console.log('Account to receive not found');
      return;
    }

    if (foundAccount.bank != account.bank) {
      console.log('Different banks, not authorized to transfer');
      return;
    }

    setAccountToReceive(foundAccount);
    setIsAccountFound(true);
  };

  const prepareToSendMoney = (amount: number) => {
    if (!accountToReceive) return;

    setAmountToTransfer(amount);
    accountToReceive.balance += amount;
    setIsReadyForTransfer(true);
  };

  const sendMoney = async () => {
    if (!accountToReceive || !messageField.current) return;

    const messageBody = messageField.current.value;
    const sender = account.accountNumber;
    const receiver = accountToReceive.accountNumber;
    const title = 'Received Credit';

    await updateAccount(accountToReceive);
    await withdraw(amountToTransfer);
    await createMessage({
      sender: sender.toString(),
      receiver: receiver.toString(),
      title: title,
      body: messageBody,
    });

    console.log('Transfer success');
    setIsReadyForTransfer(false);
    navigator.refresh();
  };

  if (System?.transactionMode == 'deposit') {
    return (
      <div className="flex flex-col items-center">
        <BankPageHeader headerText="Input amount to deposit" />
        <NumPad handleSubmit={deposit} />
      </div>
    );
  } else if (System?.transactionMode == 'withdraw') {
    return (
      <div className="flex flex-col items-center">
        <BankPageHeader headerText={withdrawHeaderText} />
        <NumPad handleSubmit={withdraw} />
      </div>
    );
  } else if (System?.transactionMode == 'balance') {
    return (
      <div className="flex flex-col bg-white rounded-lg phone:w-32 phone:h-16 laptop:w-60 laptop:h-28 items-start p-4 mt-9 justify-evenly">
        <div className="phone:text-lg laptop:text-2xl text-u_darkblue">
          Balance
        </div>
        <div className="phone:text-md laptop:text-xl">
          <span className="text-u_orange">$</span>
          {account.balance}
        </div>
      </div>
    );
  } else if (System?.transactionMode == 'transfer') {
    return (
      <div className="flex flex-col items-center">
        {isAccountFound ? (
          <>
            {isReadyForTransfer && (
              <Message
                title="Message to Receiver"
                account={account}
                messageField={messageField}
                mainOperation={sendMoney}
                preparatoryOperation={setIsReadyForTransfer}
              />
            )}

            <BankPageHeader headerText="Input amount" />
            <NumPad handleSubmit={prepareToSendMoney} />
          </>
        ) : (
          <>
            <BankPageHeader headerText="Find account number" />
            <NumPad handleSubmit={validateAccount} />
          </>
        )}
      </div>
    );
  } else if (System?.transactionMode == 'pin') {
    return <PinChange account={account} />;
  } else {
    return <div>Please select a mode</div>;
  }
}

export function BankPageHeader({ headerText }: { headerText: string }) {
  return (
    <div className="bg-white phone:w-32 phone:text-xs laptop:w-72 p-4 rounded-lg phone:mb-1 laptop:mb-4 text-center">
      <span className="phone:text-sm laptop:text-2xl">{headerText}</span>
    </div>
  );
}
