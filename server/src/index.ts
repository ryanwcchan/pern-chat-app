import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import { app, server } from "./socket/socket";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://pern-chat-app-1-6nfn.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chats", messageRoutes);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
