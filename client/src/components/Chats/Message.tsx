export default function Message({ message }: any, { authUser }: any) {
  const formattedDate = new Date(message.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const isOwnMessage = message.userId === authUser;

  return (
    <div className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full mx-2">
          <img
            alt="Message"
            src={
              isOwnMessage ? authUser?.profileImage : message.user.profilePic
            }
          />
        </div>
      </div>
      <div
        className={`chat-bubble ${
          isOwnMessage ? "bg-info" : "bg-gray-300 shadow shadow-gray-400"
        }`}
      >
        {message.content}
      </div>
      <div className="chat-footer opacity-50">{formattedDate}</div>
    </div>
  );
}
