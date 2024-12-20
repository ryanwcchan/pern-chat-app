import { useState, useEffect } from "react";
import useGetConversation from "./useGetConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const { conversation } = useGetConversation();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/messages/${conversation?.id}`);
      } catch (error) {
        console.log("Error in useGetMessages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return { messages, setMessages, loading };
};

export default useGetMessages;
