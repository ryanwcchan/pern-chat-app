import Message from "./Message";

export default function MessageContainer() {
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <div className="bg-info p-[1.5rem]">
        <h1 className="text-3xl font-semibold">Name</h1>
      </div>
      <div className="p-4 flex-1 overflow-auto">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <form className="flex items-center p-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Send message"
        />
        <button className="btn">Send</button>
      </form>
    </div>
  );
}
