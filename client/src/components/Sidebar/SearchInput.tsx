import { IoSearchSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SearchInput() {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 p-4">
      <form
        onSubmit={(e) => e.preventDefault}
        className="flex items-center gap-2 w-full"
      >
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered bg-white focus:outline-none w-full"
        />
        <button type="submit" className="btn btn-square bg-info text-white">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
      <button
        onClick={() => navigate("/addusers")}
        className="btn btn-square bg-info text-white"
      >
        <FaUserPlus className="w-6 h-6 outline-none" />
      </button>
    </div>
  );
}
