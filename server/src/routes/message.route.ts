import express from "express";
import { sendMessage, getMessages, getConversations } from "../controllers/message.controller"
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage)
router.get("/conversations", protectRoute, getConversations)
router.get("/:id", protectRoute, getMessages)

export default router;