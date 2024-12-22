import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";

export default function SearchInput() {
  return (
    <div className="flex gap-2 first-line: p-4">
      <form className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered bg-white focus:outline-none"
        />
        <button type="submit" className="btn btn-square bg-info text-white">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
      <button className="btn btn-square bg-info text-white">
        <FaUserPlus className="w-6 h-6 outline-none" />
      </button>
    </div>
  );
}
