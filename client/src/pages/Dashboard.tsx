import Sidebar from "../components/Sidebar";
import MessageContainer from "../components/MessageContainer";

export default function Dashboard() {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <MessageContainer />
      {/* <div className="grid grid-cols-4">
        <div className="grid">
          <h1 className="text-3xl font-semibold">Friends</h1>
          <div>
            <h1>Friend 1</h1>
            <h1>Friend 2</h1>
            <h1>Friend 3</h1>
          </div>
        </div>
        <div className="grid col-span-3">
          <div className="flex flex-col flex-1">
            <div>
              <h1 className="text-3xl font-semibold">Name</h1>
              <h1 className="text-2xl">Username</h1>
            </div>
            <div>Chats</div>
            <form>
              <input
                type="text"
                placeholder="Send message"
                className="input bg-white"
              />
              <button type="submit" className="btn btn-info">
                Send
              </button>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
}
