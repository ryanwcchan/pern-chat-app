import { createContext } from "react";
import { Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
  onlineUsers: string[];
}

export const SocketContext = createContext<ISocketContext | undefined>(
  undefined
);
