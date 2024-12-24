// Global types

type ConversationType = {
  users: any;
  id: string;
  username: string;
  fullName: string;
  profilePic: string;
};

type MessageType = {
  content: ReactNode;
  user: any;
  userId: string | undefined;
  createdAt: string | number | Date;
  id: string;
  message: string;
  senderId: string;
};
