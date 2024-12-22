import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

export default function MessageInput() {
  const [message, setMessage] = useState("");

  const { loading, sendMessage } = useSendMessage();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSendMessage} className="flex items-center gap-2 p-4">
      <input
        type="text"
        className="input input-bordered w-full bg-white focus:outline-none"
        placeholder="Send message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn bg-info text-white">
        {loading ? <span className="loading loading-spinner" /> : "Send"}
      </button>
    </form>
  );
}
