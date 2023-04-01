import { getMessages } from '@/adapters/userAdapter';
import { MessageModel } from '@/util/types';

async function fetchMessages(receiver: string) {
  const messages = await getMessages(receiver);

  return messages;
}

export default async function Message({
  params,
}: {
  params: { message: string };
}) {
  const messages: MessageModel[] = await fetchMessages(params.message);

  return (
    <div className="flex flex-col items-center p-3 h-[500px] overflow-scroll">
      <span className="ml-4 phone:text-md laptop:text-3xl">
        Messages for <span className="text-red-600">{params.message}</span>
      </span>

      <div className="grid grid-cols-2 mt-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              'phone:my-2 laptop:mx-4 phone:w-[210px] laptop:w-[300px] rounded-lg p-4 text-black bg-u_gray'
            }
          >
            <span className="phone:text-md laptop:text-2xl text-red-600">
              {message.title}
            </span>

            <div className="mt-4">
              <span className="phone:text-sm laptop:text-xl">
                Sender: {message.sender}
              </span>

              <div className="flex flex-col mt-3">
                <span className="phone:text-sm laptop:text-xl">Content:</span>
                <span className="phone:text-xs laptop:text-lg">
                  {message.body}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
