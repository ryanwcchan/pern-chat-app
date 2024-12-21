export default function Message({ message }: any) {
  const formattedDate = new Date(message.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full mx-2">
          <img
            alt="Message"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <div className="chat-bubble">{message.content}</div>
      <div className="chat-footer opacity-50">{formattedDate}</div>
    </div>
  );
}
