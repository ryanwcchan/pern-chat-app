import { create } from "zustand";

// export type MessageType = {
//   id: string;
//   message: string;
//   senderId: string;
// };

// export type ConversationType = {
//   id: string;
//   fullName: string;
//   profilePic: string;
// };

interface ConversationState {
  selectedConversation: ConversationType | null;
  messages: MessageType[];
  setSelectedConversation: (conversation: ConversationType | null) => void;
  setMessages: (messages: MessageType[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) => {
    console.log("Selected conversation set to:", conversation);
    set({ selectedConversation: conversation });
  },
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
