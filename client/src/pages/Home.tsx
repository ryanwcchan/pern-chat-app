import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md glass p-[3rem] rounded-lg">
          <h1 className="mb-5 text-5xl font-bold">Chat with your friends</h1>
          <p className="mb-5">
            Send messages, share memories, and stay close with the people who
            matter most.
          </p>
          <button className="btn btn-primary">
            <Link to={"/login"}>Start chatting</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
