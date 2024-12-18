import React from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function SearchInput() {
  return (
    <div className="p-4">
      <form className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered"
        />
        <button type="submit" className="btn btn-square">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
    </div>
  );
}
