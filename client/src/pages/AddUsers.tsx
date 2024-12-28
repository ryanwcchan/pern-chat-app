import UserSearchInput from "../components/AddUsers/UserSearchInput";
import useGetAllUsers from "../hooks/useGetAllUsers";
import UserCard from "../components/AddUsers/UserCard";
import { useAuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";
import useGetConversations from "../hooks/useGetConversation";

export default function AddUsers() {
  const { loading, users } = useGetAllUsers();
  const { authUser } = useAuthContext();
  const { conversations, setConversations } = useGetConversations();
  const navigate = useNavigate();

  if (!authUser) {
    navigate("/login");
  }

  const authUserConversations = new Set(
    conversations
      ?.flatMap((conversation) => conversation?.users || [])
      .filter((user) => user?.username !== authUser?.username)
      .map((user) => user?.username)
  );

  console.log(authUserConversations);

  const hasExistingConversation = (checkUser: {
    username: string | undefined;
  }) => {
    return authUserConversations.has(checkUser.username);
  };

  return (
    <div className="m-[3rem]">
      <button
        className="btn btn-neutral text-white"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Find Users</h1>
        <UserSearchInput />
      </div>
      <div className="flex flex-col gap-4 overflow-auto">
        {users?.length > 0
          ? users.map(
              (user) =>
                authUser?.username !== user.username && (
                  <UserCard
                    key={user.username}
                    user={user}
                    hasExistingConversation={hasExistingConversation}
                    conversations={conversations}
                    setConversations={setConversations}
                  />
                )
            )
          : !loading && <div className="text-center">No users found</div>}
        {loading ? <span className="loading loading-spinner mx-auto" /> : null}
      </div>
    </div>
  );
}
