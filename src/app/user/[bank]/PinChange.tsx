import { createChangePinRequest } from '@/adapters/userAdapter';
import Message from '@/util/Message';
import NumPad from '@/util/Numpad';
import { AccountModel, ChangePinRequest } from '@/util/types';
import { useState, useRef } from 'react';
import { BankPageHeader } from './Transactions';

export default function PinChange({ account }: { account: AccountModel }) {
  const [pin, setPin] = useState(0);
  const [headerText, setHeaderText] = useState('Verify login');
  const [arePasswordsMatched, passWordsAreMatched] = useState(false);
  const [isReadyForSubmission, setIsReadyForSubmission] = useState(false);
  const messageField = useRef<HTMLInputElement>(null);

  const validatePin = (pin: number) => {
    if (!account) return;

    if (account.pin == pin) {
      setHeaderText('Change Pin');
      setPin(pin);
      passWordsAreMatched(true);
    } else setHeaderText("Pins don't match!");
  };

  const prepareToChangePin = (pin: number) => {
    setPin(pin);
    setIsReadyForSubmission(true);
  };

  const changePin = async () => {
    if (!account || !messageField.current) return;

    const request: ChangePinRequest = {
      accountNumber: account.accountNumber,
      newPin: pin,
      title: 'Change Pin',
      body: messageField.current.value,
    };

    await createChangePinRequest(request);
    setIsReadyForSubmission(false);
    setHeaderText('Pin change request submitted to admin');
  };

  return (
    <div className="flex flex-col items-center">
      <BankPageHeader headerText={headerText} />

      {arePasswordsMatched ? (
        <>
          {isReadyForSubmission && (
            <Message
              title="Reason for Change"
              account={account}
              messageField={messageField}
              mainOperation={changePin}
              preparatoryOperation={setIsReadyForSubmission}
            />
          )}
          <NumPad handleSubmit={prepareToChangePin} />
        </>
      ) : (
        <NumPad handleSubmit={validatePin} />
      )}
    </div>
  );
}
