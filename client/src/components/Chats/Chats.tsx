import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversation";

export default function Chats() {
  const { conversations, loading } = useGetConversations();
  return (
    <div className="flex flex-col gap-4 overflow-auto px-6 py-4">
      {conversations?.length > 0
        ? conversations.map((conversation) => (
            <Conversation key={conversation.id} conversation={conversation} />
          ))
        : !loading && <div className="text-center">No conversations</div>}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
}
