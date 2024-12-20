import Sidebar from "../components/Sidebar/Sidebar";
import MessageContainer from "../components/Chats/MessageContainer";

export default function Dashboard() {
  return (
    <div className="h-full">
      <div className="flex h-[calc(100vh-8rem)]">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
}
