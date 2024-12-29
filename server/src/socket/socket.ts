import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap: { [key: string]: string } = {}; // userId: socketId

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  const userId = socket.handshake.query.userId as string;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() is used to listen to events, can be used on client and server side
  socket.on("disconnect", () => {
    console.log("User Disconnected: ", socket.id);

    delete userSocketMap[userId];

    // Update the list of online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
