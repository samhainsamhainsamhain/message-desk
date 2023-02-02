import { useState } from "react";
import { api } from "../../utils/api";

const Messages = () => {
  const [newMessage, setNewMessage] = useState("");

  // tRPC
  const { data: messages, refetch } =
    api.messages.getMessagesHistory.useQuery();
  const { mutateAsync: createMessage } =
    api.messages.createMessage.useMutation();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await createMessage(newMessage);
    await refetch();
    setNewMessage("");
  };

  return (
    <div className="flex flex-col justify-center align-middle text-2xl text-white md:w-3/4">
      <form onSubmit={void submitHandler} className="flex">
        <div className="md:w-3/4">
          <input
            id="message"
            value={newMessage}
            onChange={(event) => setNewMessage(event.currentTarget.value)}
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
          />
        </div>
        <button
          className="ml-4 cursor-pointer rounded bg-violet-500 px-4 font-bold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-500 md:w-1/4"
          type="submit"
          disabled={!newMessage.trim()}
        >
          Post
        </button>
      </form>
      <ul className="grid grid-cols-1 justify-items-stretch gap-4 py-8 sm:grid-cols-4 md:gap-8">
        {messages?.map((message) => (
          <li
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/20 p-4 text-white hover:bg-white/30"
            key={message.id}
          >
            {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
