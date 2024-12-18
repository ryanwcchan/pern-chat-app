import React from "react";

export default function Profile() {
  return (
    <div className="m-[3rem] flex flex-col justify-center items-center min-h-[70vh]">
      <h1 className="text-3xl font-semibold">Profile</h1>
      <div>
        <h2>Full Name</h2>
        <p>Username</p>
        <p>Gender</p>
      </div>
    </div>
  );
}
