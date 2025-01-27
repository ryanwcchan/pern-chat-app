"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controllers/message.controller");
const protectRoute_1 = __importDefault(require("../middleware/protectRoute"));
const router = express_1.default.Router();
router.get("/", protectRoute_1.default, message_controller_1.getConversations); // Fetch all conversations
router.post("/message/:id", protectRoute_1.default, message_controller_1.sendMessage); // Send a message to user(ID)
router.get("/conversation/:conversationId/messages", protectRoute_1.default, message_controller_1.getConversationMessages); // Fetch all messages of a conversation
router.delete("/messages/:messageId", protectRoute_1.default, message_controller_1.deleteMessage); // Delete a message by message id
router.post("/conversation/:username", protectRoute_1.default, message_controller_1.createConversation);
exports.default = router;
