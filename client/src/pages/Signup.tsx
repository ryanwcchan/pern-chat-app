import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../Hooks/useSignup";

export default function Signup() {
  const [inputs, setInputs] = useState({
    username: "",
    fullName: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useSignup();

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    signup(inputs);
  };

  return (
    <div className="m-[3rem] flex flex-col justify-center items-center flex-1">
      <div className="flex flex-col gap-4 p-[3rem] rounded-lg shadow shadow-gray-400 bg-white">
        <h1 className="text-3xl font-semibold">Register</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Username:</label>
            <input
              type="text"
              className="input input-bordered grow bg-gray-50"
              placeholder="Username"
              name="username"
              required
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Full Name:</label>
            <input
              type="text"
              className="input input-bordered grow bg-gray-50"
              placeholder="Full Name"
              name="fullName"
              required
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Gender:</label>
            <select
              className="select select-bordered w-full max-w-xs bg-gray-50"
              required
              value={inputs.gender}
              onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Password:</label>
            <input
              type="password"
              className="input input-bordered grow bg-gray-50"
              placeholder="Password"
              name="password"
              required
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Confirm Password:</label>
            <input
              type="password"
              className="input input-bordered grow bg-gray-50"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-info" disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <Link to={"/login"} className="link link-info">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
