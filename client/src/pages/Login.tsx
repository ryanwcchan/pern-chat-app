import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { login, loading, error } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(inputs);
  };

  return (
    <div className="m-[3rem] flex flex-col justify-center items-center flex-1">
      <div className="flex flex-col gap-4 p-[3rem] rounded-lg shadow shadow-gray-400 bg-white">
        <h1 className="text-3xl font-semibold">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label className="input input-bordered flex items-center gap-2 bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              required
            />
          </label>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="btn btn-info" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <Link to={"/signup"} className="link link-info">
          Don't have an account?
        </Link>
      </div>
    </div>
  );
}
