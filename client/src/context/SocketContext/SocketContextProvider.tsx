import { useState, useEffect, ReactNode, useRef } from "react";
import { useAuthContext } from "../useAuthContext";
import { SocketContext } from "./SocketContext";
import io, { Socket } from "socket.io-client";

const socketURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://pern-chat-app-r3jf.onrender.com";

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const { authUser, isLoading } = useAuthContext();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoading && authUser) {
      const socket = io(socketURL, {
        query: {
          userId: authUser.id,
        },
        withCredentials: true,
      });

      socketRef.current = socket;

      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
        socketRef.current = null;
      };
    } else if (!isLoading && !authUser) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [authUser, isLoading]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
