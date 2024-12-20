import Message from "./Message";

export default function MessageContainer() {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-info p-[1.5rem]">
        <h1 className="text-3xl font-semibold">Name</h1>
      </div>
      <div className="p-4 overflow-auto">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <form className="flex items-center gap-2 p-4">
        <input
          type="text"
          className="input input-bordered w-full bg-white focus:outline-none"
          placeholder="Send message"
        />
        <button className="btn">Send</button>
      </form>
    </div>
  );
}
