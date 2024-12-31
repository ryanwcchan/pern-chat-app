// Global types

type ConversationType = {
  users: UserType[];
  id: string;
  createdAt: string;
  updatedAt: string;
};

type UserType = {
  id: string;
  username: string;
  fullName: string;
  profilePic: string;
};

type MessageType = {
  conversationId: string;
  content: ReactNode;
  user: any;
  userId: string | undefined;
  createdAt: string | number | Date;
  id: string;
  message: string;
  senderId: string;
};
