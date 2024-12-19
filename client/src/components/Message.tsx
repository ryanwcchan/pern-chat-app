export default function Message() {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Message"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <div className="chat-bubble">Hello this is a message.</div>
      <div className="chat-footer opacity-50">12:42</div>
    </div>
  );
}
