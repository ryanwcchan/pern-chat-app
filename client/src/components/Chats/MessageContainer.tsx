import Message from "./Message";
import useConversation from "../../zustand/useConversation";
import useGetMessages from "../../hooks/useGetMessages";
import { useAuthContext } from "../../context/useAuthContext";
import MessageInput from "./MessageInput";
import { useEffect, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useSocketContext } from "../../context/SocketContext/useSocketContext";
import useListenMessages from "../../hooks/useListenMessages";

function DefaultScreen() {
  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <h1 className="text-3xl font-semibold text-wrap px-[3rem] text-center">
        Select a chat to start messaging
      </h1>
    </div>
  );
}

function ConversationScreen({
  messages,
  loading,
  setView,
  onlineUsers,
}: {
  messages: MessageType[];
  loading: boolean;
  setView: any;
  onlineUsers: string[];
}) {
  const { selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when the component is mounted
  useEffect(() => {
    if (!loading) {
      scrollToBottom(); // Initial scroll
    }
  }, [messages, loading]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom(); // Scroll on new message
  }, [messages]);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView();
    }
  };

  if (!selectedConversation || !selectedConversation.users) {
    return <DefaultScreen />;
  }

  const otherUser = selectedConversation.users.find(
    (user: { id: string | undefined }) => user.id !== authUser?.id
  );

  const isOnline = otherUser ? onlineUsers.includes(otherUser.id) : false;

  return (
    <div className="flex flex-col max-h-[calc(100vh-8rem)] flex-1">
      {/* Conversation Header */}
      <div className="bg-info p-[1.5rem] flex gap-4 items-center">
        {/* Back Button for mobile view */}
        <button
          className="btn btn-square bg-info text-white md:hidden"
          onClick={() => setView("sidebar")}
        >
          <IoIosArrowBack />
        </button>
        <div className={`avatar w-12 ${isOnline ? "online" : ""}`}>
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
      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <span className="loading loading-spinner mx-auto" />
        </div>
      ) : (
        <div className="p-4 overflow-auto flex-1">
          {/* Check if messages is an array before mapping */}
          {Array.isArray(messages) ? (
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))
          ) : (
            <div>No messages available</div>
          )}
          <div ref={chatEndRef} />
        </div>
      )}
      <MessageInput />
    </div>
  );
}

export default function MessageContainer({ setView }: any) {
  const { selectedConversation } = useConversation();
  const { messages, loading } = useGetMessages();
  const { onlineUsers } = useSocketContext();
  useListenMessages();

  return (
    <div className="flex flex-col w-full">
      {selectedConversation && selectedConversation ? (
        <ConversationScreen
          messages={messages}
          loading={loading}
          setView={setView}
          onlineUsers={onlineUsers}
        />
      ) : (
        <DefaultScreen />
      )}
    </div>
  );
}
