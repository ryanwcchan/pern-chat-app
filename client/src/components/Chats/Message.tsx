import { useAuthContext } from "../../context/useAuthContext";

export default function Message({ message }: { message: MessageType }) {
  const { authUser } = useAuthContext();

  const formattedDate = new Date(message.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const fromMe = message.userId === authUser?.id;

  return (
    <div className={`chat py-2 ${fromMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full mx-2">
          <img
            alt="Message"
            src={fromMe ? authUser?.profilePic : message.user.profilePic}
          />
        </div>
      </div>
      <div
        className={`chat-bubble break-words text-wrap ${
          fromMe ? "bg-info text-white" : "bg-white shadow shadow-gray-400"
        }`}
      >
        {message.content}
      </div>
      <div className="chat-footer opacity-50 pt-1">{formattedDate}</div>
    </div>
  );
}
