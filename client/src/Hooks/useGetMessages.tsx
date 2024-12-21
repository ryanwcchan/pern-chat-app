import { useState, useEffect } from "react";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const { selectedConversation } = useConversation();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) {
        console.log("Conversation Id not found");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `/api/chats/conversation/${selectedConversation.id}/messages`
        );
        const data = await response.json();

        console.log(data);
        setMessages(data || []);
      } catch (error) {
        console.log("Error in useGetMessages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  return { messages, setMessages, loading };
};

export default useGetMessages;
