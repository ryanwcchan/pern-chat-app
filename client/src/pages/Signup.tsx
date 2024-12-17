import React from "react";

export default function Signup() {
  return (
    <div className="m-[3rem] flex flex-col justify-center items-center min-h-[70vh]">
      <div className="flex flex-col gap-4 p-[3rem] rounded-lg shadow shadow-gray-400">
        <h1 className="text-3xl font-semibold">Register</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Username:</label>
            <input
              type="text"
              className="input input-bordered grow"
              placeholder="Username"
              name="username"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Full Name:</label>
            <input
              type="text"
              className="input input-bordered grow"
              placeholder="Full Name"
              name="fullName"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Gender:</label>
            <select className="select select-bordered w-full max-w-xs" required>
              <option disabled defaultValue={"Select Gender"}>
                Select Gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Password:</label>
            <input
              type="password"
              className="input input-bordered grow"
              placeholder="Password"
              name="password"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Confirm Password:</label>
            <input
              type="password"
              className="input input-bordered grow"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}
