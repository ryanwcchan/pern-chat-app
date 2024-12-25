import UserSearchInput from "../components/AddUsers/UserSearchInput";
import useGetAllUsers from "../hooks/useGetAllUsers";
import UserCard from "../components/AddUsers/UserCard";
import { useAuthContext } from "../context/useAuthContext";

export default function AddUsers() {
  const { loading, users } = useGetAllUsers();
  const { authUser } = useAuthContext();

  return (
    <div className="m-[3rem]">
      <button className="btn btn-neutral text-white">Back</button>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Find Users</h1>
        <UserSearchInput />
      </div>
      <div className="flex flex-col gap-4 overflow-auto">
        {users?.length > 0
          ? users.map(
              (user) =>
                authUser?.username !== user.username && (
                  <UserCard key={user.username} user={user} />
                )
            )
          : !loading && <div className="text-center">No users found</div>}
        {loading ? <span className="loading loading-spinner mx-auto" /> : null}
      </div>
    </div>
  );
}
