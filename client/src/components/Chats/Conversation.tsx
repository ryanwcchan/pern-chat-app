// eslint-disable-next-line @typescript-eslint/no-explicit-any

import useConversation from "../../zustand/useConversation";

export default function Conversation({ conversation }: any) {
  if (!conversation) {
    return null;
  }

  const { setSelectedConversation } = useConversation();

  const handleClick = () => {
    setSelectedConversation(conversation);
    console.log("Conversation clicked, convo id: ", conversation.id);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-4 transition all ease-in-out duration-200 hover:bg-info hover:text-white rounded-lg px-4 py-2 cursor-pointer"
    >
      <div className="avatar online">
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div>
        <div className="font-bold">{conversation.users[1]?.fullName}</div>
        <div className="text-sm opacity-50">
          {conversation.users[1]?.username}
        </div>
      </div>
    </div>
  );
}
