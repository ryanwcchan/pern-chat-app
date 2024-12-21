import Message from "./Message";
import useConversation from "../../zustand/useConversation";
import useGetMessages from "../../Hooks/useGetMessages";
import { useAuthContext } from "../../context/useAuthContext";

function DefaultScreen() {
  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <h1 className="text-3xl font-semibold text-wrap px-[3rem] text-center">
        Select a chat to start messaging
      </h1>
    </div>
  );
}

function ConversationScreen({ messages }: { messages: MessageType[] }) {
  const { selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  if (!selectedConversation) {
    return <div>No conversation selected</div>;
  }

  const otherUser = selectedConversation.users.find(
    (user: { id: string | undefined }) => user.id !== authUser?.id
  );

  return (
    <div className="flex flex-col h-full">
      {/* Conversation Header */}
      <div className="bg-info p-[1.5rem] flex gap-4 items-center">
        <div>
          <img
            className="w-12 rounded-full"
            src={otherUser?.profilePic}
            alt="profile pic"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold text-white">
            {otherUser?.fullName}
          </h1>
          <h2 className="text-white opacity-80">{otherUser?.username}</h2>
        </div>
      </div>
      <div className="p-4 overflow-auto flex-1">
        {messages.map((message) => (
          <Message key={message.id} message={message} authUser={authUser} />
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
