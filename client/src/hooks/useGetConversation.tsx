import { useState, useEffect } from "react";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  // ConversationType from global types
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/chats`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        console.log(data.conversations);
        setConversations(data.conversations || []);
      } catch (error) {
        console.log("Error in useGetConversation", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  return { conversations, setConversations, loading };
};

export default useGetConversations;
