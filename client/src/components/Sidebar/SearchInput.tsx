import { IoSearchSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useGetConversations from "../../hooks/useGetConversation";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/useAuthContext";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const { authUser } = useAuthContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search.trim()) return;
    if (search.length < 3) {
      alert("Search must be at least 3 characters");
    }

    const conversation = conversations.find((c: ConversationType) =>
      c.users.some(
        (user: UserType) =>
          user.fullName?.toLowerCase().includes(search.toLowerCase()) &&
          user.id !== authUser?.id
      )
    );
    // const conversation = conversations.find(
    //   (conversation: ConversationType) => {
    //     conversation.users.find((user: UserType) => {
    //       return (
    //         user.fullName.toLowerCase().includes(search.toLowerCase()) &&
    //         user.id !== authUser?.id
    //       );
    //     });
    //   }
    // );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      alert("No conversation found");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="flex gap-2 p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered bg-white focus:outline-none w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
