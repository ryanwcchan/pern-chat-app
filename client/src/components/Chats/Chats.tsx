import Conversation from "./Conversation";
import useGetConversations from "../../Hooks/useGetConversation";

export default function Chats() {
  const { conversations, loading } = useGetConversations();
  return (
    <div className="flex flex-col gap-4 overflow-auto px-6 py-4">
      {conversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
}
