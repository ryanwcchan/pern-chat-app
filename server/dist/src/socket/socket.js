"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.server =
  exports.io =
  exports.app =
  exports.getReceiverSocketId =
    void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
  cors: {
    origin: [
      "http://localhost:5173", // Frontend origin during development
      "http://localhost:5174", // Another frontend origin during development
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "*", // Production (e.g., Vercel)
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
exports.io = io;
const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
exports.getReceiverSocketId = getReceiverSocketId;
const userSocketMap = {}; // userId: socketId
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  const userId = socket.handshake.query.userId;
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
