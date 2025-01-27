import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import { app, server } from "./socket/socket";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;
const allowedOrigin = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}` // e.g., https://your-vercel-project.vercel.app
  : "*";

app.use(
  cors({
    origin: allowedOrigin, // Allow requests from any origin
    credentials: true, // If your API needs cookies to be sent
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chats", messageRoutes);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
