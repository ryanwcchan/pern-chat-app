import Sidebar from "../components/Sidebar/Sidebar";
import MessageContainer from "../components/Chats/MessageContainer";
import { useState } from "react";

export default function Dashboard() {
  const [view, setView] = useState<"sidebar" | "chat">("sidebar");

  return (
    <div className="h-full w-full">
      <div className="hidden md:flex min-h-[calc(100vh-8rem)]">
        <div className="w-fit">
          <Sidebar />
        </div>
        <MessageContainer />
      </div>

      {/* Mobile view */}
      <div className="flex md:hidden min-h-[calc(100vh-8rem)]">
        {view === "sidebar" ? (
          <Sidebar setView={setView} />
        ) : (
          <MessageContainer setView={setView} />
        )}
      </div>
    </div>
  );
}
