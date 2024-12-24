import React from "react";

export default function AddUsers() {
  return (
    <div className="m-[3rem]">
      <h1 className="text-3xl font-semibold mb-4">Profile</h1>
      <div className="flex gap-4 items-center p-4  bg-white rounded-lg shadow shadow-gray-400 ">
        <div className="flex items-center justify-center border border-gray-400 rounded-full"></div>
        Profile Image
        <div>
          <h2 className="text-2xl font-bold">Name</h2>
          <p className="text-gray-400 font-semibold">Username</p>
          <p className="font-semibold">
            Gender: <span className="capitalize"></span>
          </p>
        </div>
      </div>
    </div>
  );
}
