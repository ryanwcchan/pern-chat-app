import React from "react";

export default function Conversation() {
  return (
    <div className="flex items-center gap-4">
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
