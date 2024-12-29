import { UserType } from "../../hooks/useGetAllUsers";
import { useNavigate } from "react-router-dom";
import useConversation from "../../zustand/useConversation";
import useCreateConversation from "../../hooks/useCreateConversation";
import { useSocketContext } from "../../context/SocketContext/useSocketContext";

export default function UserCard({
  user,
  hasExistingConversation,
  conversations,
  setConversations,
}: {
  user: UserType;
  hasExistingConversation: (checkUser: {
    username: string | undefined;
  }) => boolean;
  conversations: any;
  setConversations: any;
}) {
  const { setSelectedConversation } = useConversation();
  const navigate = useNavigate();
  const { createConversation, loading } = useCreateConversation();
  const { onlineUsers } = useSocketContext();

  const navigateToChat = async () => {
    if (hasExistingConversation(user)) {
      const conversation =
        conversations?.find((c) =>
          c?.users?.some(
            (u: { username: string }) => u?.username === user?.username
          )
        ) || null;
      setSelectedConversation(conversation);
      navigate(`/chat`);
    } else {
      const newConversation = await createConversation(user?.username || "");
      console.log(newConversation);

      if (newConversation) {
        setConversations((prev: any) => {
          const updatedConversations = [...prev, newConversation];
          setSelectedConversation(newConversation);
          return updatedConversations;
        });
        navigate(`/chat`);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const isOnline = user?.id ? onlineUsers.includes(user?.id) : false;

  return (
    <div className="flex justify-between gap-4 items-center p-4  bg-white rounded-lg shadow shadow-gray-400">
      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center border border-gray-400 rounded-full">
          <div className={`avatar w-32 ${isOnline ? "online" : ""}`}>
            {user?.profilePic && (
              <img className="w-32 h-32" src={user?.profilePic} alt="" />
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user?.fullName}</h2>
          <p className="text-gray-400 font-semibold">{user?.username}</p>
          <p className="font-semibold">
            Gender: <span className="capitalize">{user?.gender}</span>
          </p>
        </div>
      </div>
      <div className="p-6">
        <button
          className="btn btn-info"
          onClick={navigateToChat}
          disabled={loading}
        >
          {hasExistingConversation(user) ? "Message" : "Add"}
        </button>
      </div>
    </div>
  );
}
