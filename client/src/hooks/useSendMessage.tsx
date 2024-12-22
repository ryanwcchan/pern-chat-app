import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/useAuthContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();
  const { authUser } = useAuthContext();

  const sendMessage = async (message: string) => {
    if (!selectedConversation) {
      console.log("Conversation Id not found");
      return;
    }

    const recipient = selectedConversation.users.find(
      (user: any) => user.id !== authUser // Exclude logged-in user to find the recipient
    );

    try {
      setLoading(true);
      const response = await fetch(`/api/chats/message/${recipient.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);

      setMessages([...messages, data.message]);
    } catch (error) {
      console.log("Error in useSendMessage", error);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
