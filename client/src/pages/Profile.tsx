import { useAuthContext } from "../context/useAuthContext";

export default function Profile() {
  const { authUser } = useAuthContext();

  if (!authUser) {
    return <div>Loading...</div>;
  }

  console.log(authUser);
  return (
    <div className="m-[3rem]">
      <h1 className="text-3xl font-semibold mb-4">Profile</h1>
      <div className="flex gap-4 items-center p-4  bg-white rounded-lg shadow shadow-gray-400 ">
        <div className="flex items-center justify-center border border-gray-400 rounded-full">
          <img className="w-32 h-32" src={authUser?.profilePic} alt="" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{authUser?.fullName}</h2>
          <p className="text-gray-400 font-semibold">{authUser?.username}</p>
          <p className="font-semibold">
            Gender: <span className="capitalize">{authUser?.gender}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
