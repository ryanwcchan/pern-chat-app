import { UserType } from "../../hooks/useGetAllUsers";

export default function UserCard({ user }: { user: UserType }) {
  return (
    <div className="flex justify-between gap-4 items-center p-4  bg-white rounded-lg shadow shadow-gray-400 ">
      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center border border-gray-400 rounded-full">
          {user?.profilePic && (
            <img className="w-32 h-32" src={user?.profilePic} alt="" />
          )}
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
        <button className="btn btn-info">Message</button>
      </div>
    </div>
  );
}
