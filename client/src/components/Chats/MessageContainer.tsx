import Message from "./Message";
import useConversation from "../../zustand/useConversation";
import useGetMessages from "../../Hooks/useGetMessages";

function DefaultScreen() {
  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <h1 className="text-3xl font-semibold text-wrap px-[3rem] text-center">
        Select a chat to start messaging
      </h1>
    </div>
  );
}

function ConversationScreen({ messages }: { messages: any[] }) {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex flex-col h-full">
      {/* Conversation Header */}
      <div className="bg-info p-[1.5rem] flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-white">
          {(selectedConversation && selectedConversation.users[1]?.fullName) ||
            "Chat"}
        </h1>
        <h2 className="text-white opacity-80">
          {selectedConversation?.users[1]?.username}
        </h2>
      </div>
      <div className="p-4 overflow-auto flex-1">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <form className="flex items-center gap-2 p-4 ">
        <input
          type="text"
          className="input input-bordered w-full bg-white focus:outline-none"
          placeholder="Send message"
        />
        <button className="btn bg-info text-white">Send</button>
      </form>
    </div>
  );
}

export default function MessageContainer() {
  const { selectedConversation } = useConversation();
  const { messages } = useGetMessages();

  return (
    <div className="flex flex-col w-full">
      {selectedConversation ? (
        <ConversationScreen messages={messages} />
      ) : (
        <DefaultScreen />
      )}
    </div>
  );
}
