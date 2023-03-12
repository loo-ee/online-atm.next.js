'use client';

import { getMessages } from '@/adapters/userAdapter';
import { MessageModel } from '@/util/types';
import { useState, useEffect } from 'react';

export default function Inbox({ receiver }: { receiver: string }) {
  const [messages, setMessages] = useState<MessageModel[]>();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const foundMessages = await getMessages(receiver);
    setMessages(foundMessages);
  };

  if (messages?.length == 0) return <></>;
  else
    return (
      <div className={'my-6 phone:p-2 laptop:p-5 rounded-lg bg-primary'}>
        <span className="ml-4 phone:text-md laptop:text-3xl text-white">
          Messages for <span className="text-secondary">{receiver}</span>
        </span>

        <div className="h-[300px] mt-3 phone:overflow-y-scroll laptop:overflow-x-scroll phone:grid-flow-row laptop:grid-flow-col grid scrollbar-thin">
          {/* {messages?.map((message, index) => (
            <MessageCard key={index} message={message} />
          ))} */}
        </div>
      </div>
    );
}
