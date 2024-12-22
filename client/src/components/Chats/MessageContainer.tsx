import Message from "./Message";
import useConversation from "../../zustand/useConversation";
import useGetMessages from "../../hooks/useGetMessages";
import { useAuthContext } from "../../context/useAuthContext";
import MessageInput from "./MessageInput";
import { useEffect, useRef } from "react";

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
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when the component is mounted
  useEffect(() => {
    scrollToBottom(); // Initial scroll
  }, []);

  // Scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom(); // Scroll on new message
  }, [messages]);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView();
    }
  };

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
          <Message key={message.id} message={message} />
        ))}
        <div ref={chatEndRef} />
      </div>
      <MessageInput />
    </div>
  );
}

export default function MessageContainer() {
  const { selectedConversation } = useConversation();
  const { messages } = useGetMessages();

  return (
    <div className="flex flex-col w-full">
      {selectedConversation && selectedConversation ? (
        <ConversationScreen messages={messages} />
      ) : (
        <DefaultScreen />
      )}
    </div>
  );
}
