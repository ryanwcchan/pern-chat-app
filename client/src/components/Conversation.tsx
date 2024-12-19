export default function Conversation() {
  return (
    <div className="flex items-center gap-4 hover:bg-info rounded-lg px-4 py-2 cursor-pointer">
      <div className="avatar online">
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div>
        <div className="font-bold">John Doe</div>
      </div>
    </div>
  );
}
