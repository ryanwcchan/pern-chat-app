import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
