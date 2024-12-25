import { IoSearchSharp } from "react-icons/io5";

export default function UserSearchInput() {
  return (
    <div className="flex gap-2 py-4">
      <form
        onSubmit={(e) => e.preventDefault}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered bg-white focus:outline-none"
        />
        <button type="submit" className="btn btn-square bg-info text-white">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
    </div>
  );
}
