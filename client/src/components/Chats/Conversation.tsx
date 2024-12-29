// eslint-disable-next-line @typescript-eslint/no-explicit-any

import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/useAuthContext";
import { useSocketContext } from "../../context/SocketContext/useSocketContext";

export default function Conversation({ conversation, setView }: any) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  const { onlineUsers } = useSocketContext();

  if (!conversation) {
    return null;
  }

  const otherUser = conversation.users.find(
    (user: { id: string | undefined }) => user.id !== authUser?.id
  );

  const isOnline = otherUser ? onlineUsers.includes(otherUser.id) : false;

  const handleClick = () => {
    setSelectedConversation(conversation);
    if (window.innerWidth < 768) {
      setView("chat");
    }
    console.log("Conversation clicked, convo id: ", conversation.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-4 transition all ease-in-out duration-200 
      hover:bg-info hover:text-white rounded-lg px-4 py-2 cursor-pointer ${
        selectedConversation?.id === conversation.id
          ? "bg-primary text-black"
          : ""
      }`}
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-12 rounded-full">
          <img src={otherUser?.profilePic} />
        </div>
      </div>
      <div>
        <div className="font-bold">{otherUser?.fullName}</div>
        <div className="text-sm opacity-50">{otherUser?.username}</div>
      </div>
    </div>
  );
}
