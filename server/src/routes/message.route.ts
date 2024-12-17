import express from "express";
import {
  sendMessage,
  getConversations,
  getConversationMessages,
  deleteMessage,
} from "../controllers/message.controller";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);
router.get("/conversations", protectRoute, getConversations);
router.get("/:conversationId", protectRoute, getConversationMessages);
router.delete("/delete/:messageId", protectRoute, deleteMessage);

export default router;
