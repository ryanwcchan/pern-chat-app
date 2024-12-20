import express from "express";
import {
  sendMessage,
  getConversations,
  getConversationMessages,
  deleteMessage,
} from "../controllers/message.controller";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.get("/", protectRoute, getConversations); // Fetch all conversations
router.post("/message/:id", protectRoute, sendMessage); // Send a message to user(ID)
router.get(
  "/conversation/:conversationId/messages",
  protectRoute,
  getConversationMessages
); // Fetch all messages of a conversation
router.delete("/messages/:messageId", protectRoute, deleteMessage); // Delete a message by message id

export default router;
