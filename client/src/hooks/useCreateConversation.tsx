import { useState } from "react";

const useCreateConversation = () => {
  const [loading, setLoading] = useState(false);

  const createConversation = async (username: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chats/conversation/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.log("Error in useCreateConversation", error);
    } finally {
      setLoading(false);
    }
  };

  return { createConversation, loading };
};

export default useCreateConversation;
