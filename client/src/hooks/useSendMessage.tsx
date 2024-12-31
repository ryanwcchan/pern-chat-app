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

    console.log("Selected Conversation:", selectedConversation);

    const recipient = selectedConversation.users.find(
      (user: UserType) => user.id !== authUser?.id // Exclude logged-in user to find the recipient
    );

    console.log("authUser:", authUser);
    console.log("Recipient:", recipient);

    try {
      setLoading(true);
      const response = await fetch(`/api/chats/message/${recipient?.id}`, {
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
      console.log(`Message sent to recipient: ${recipient?.id}`, data);

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
