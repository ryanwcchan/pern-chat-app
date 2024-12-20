import Conversation from "./Conversation";

export default function Chats() {
  return (
    <div className="flex flex-col gap-4 overflow-auto px-6 py-4">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
}
