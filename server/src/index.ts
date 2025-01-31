import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import { app, server } from "./socket/socket";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pern-chat-app-1-6nfn.onrender.com",
    ], // Allow local and deployed frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies/auth headers
    allowedHeaders: ["Content-Type", "Authorization"], // Allow custom headers
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});
app.use("/api/auth", authRoutes);
app.use("/api/chats", messageRoutes);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
