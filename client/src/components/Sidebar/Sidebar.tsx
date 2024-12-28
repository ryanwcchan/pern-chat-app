import SearchInput from "./SearchInput";
import Chats from "../Chats/Chats";

export default function Sidebar() {
  return (
    <div className="flex flex-col border-r border-slate-500 w-full h-full">
      <SearchInput />
      <div className="divider m-0"></div>
      <Chats />
    </div>
  );
}
