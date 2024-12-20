import Message from "./Message";
import useConversation from "../../zustand/useConversation";

function defaultScreen() {
  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <h1 className="text-3xl font-semibold text-wrap px-[3rem] text-center">
        Select a chat to start messaging
      </h1>
    </div>
  );
}

function conversationScreen() {
  return (
    <div>
      <div className="bg-info p-[1.5rem]">
        <h1 className="text-3xl font-semibold text-white">Name</h1>
      </div>
      <div className="p-4 overflow-auto flex-1">
        <Message />
      </div>
      <form className="flex items-center gap-2 p-4 ">
        <input
          type="text"
          className="input input-bordered w-full bg-white focus:outline-none"
          placeholder="Send message"
        />
        <button className="btn bg-info text-white">Send</button>
      </form>
    </div>
  );
}

export default function MessageContainer() {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex flex-col w-full">
      {selectedConversation ? conversationScreen() : defaultScreen()}
    </div>
  );
}
