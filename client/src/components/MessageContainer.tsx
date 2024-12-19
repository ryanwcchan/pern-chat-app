import Message from "./Message";

export default function MessageContainer() {
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <div className="bg-info p-[1.5rem]">
        <h1 className="text-3xl font-semibold">Name</h1>
      </div>
      <div className="flex flex-col gap-4 p-[1.5rem]">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </div>
  );
}
