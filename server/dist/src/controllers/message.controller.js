"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConversation = exports.deleteMessage = exports.getConversationMessages = exports.updateConversationList = exports.getConversations = exports.sendMessage = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const socket_1 = require("../socket/socket");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user.id;
        // Check for existing conversations where conversation users has senderId and recieverId
        let conversation = yield prisma_1.default.conversations.findFirst({
            where: {
                AND: [
                    {
                        users: {
                            some: {
                                id: senderId,
                            },
                        },
                    },
                    {
                        users: {
                            some: {
                                id: recieverId,
                            },
                        },
                    },
                ],
            },
        });
        // If not conversation between the users exists, create a new one.
        if (!conversation) {
            conversation = yield prisma_1.default.conversations.create({
                data: {
                    users: {
                        connect: [
                            {
                                id: senderId,
                            },
                            {
                                id: recieverId,
                            },
                        ],
                    },
                },
            });
        }
        // Create new message to add to conversation
        const newMessage = yield prisma_1.default.message.create({
            data: {
                content: message,
                userId: senderId,
                conversationId: conversation.id,
            },
            include: {
                user: {
                    // Include sender details
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        profilePic: true,
                    },
                },
            },
        });
        const receiverSocketId = (0, socket_1.getReceiverSocketId)(recieverId);
        if (receiverSocketId) {
            socket_1.io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(200).json({
            message: newMessage,
            conversation: conversation,
        });
    }
    catch (error) {
        console.log("Error in send message controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.sendMessage = sendMessage;
const getConversations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const conversations = yield prisma_1.default.conversations.findMany({
            where: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
            include: {
                users: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        profilePic: true,
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        res.status(200).json({ conversations: conversations });
    }
    catch (error) {
        console.log("Error in get conversations controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getConversations = getConversations;
const updateConversationList = (conversationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedConversation = yield prisma_1.default.conversations.findUnique({
            where: { id: conversationId },
            include: {
                users: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        profilePic: true,
                    },
                },
            },
        });
        if (updatedConversation) {
            socket_1.io.emit("updateConversationList", updatedConversation);
        }
    }
    catch (error) {
        console.log("Error in update conversation list controller", error);
    }
});
exports.updateConversationList = updateConversationList;
const getConversationMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { conversationId } = req.params;
        console.log("Fetched messages from Conversation Id:", conversationId);
        const conversation = yield prisma_1.default.conversations.findUnique({
            where: { id: conversationId },
        });
        if (!conversation) {
            res.status(404).json({ error: "Conversation not found" });
            return;
        }
        const messages = yield prisma_1.default.message.findMany({
            where: {
                conversationId: conversationId,
            },
            include: {
                user: {
                    // Include sender details
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        profilePic: true,
                    },
                },
            },
            orderBy: {
                updatedAt: "asc", // Sort messages by creation date (ascending)
            },
        });
        res.status(200).json(messages);
    }
    catch (error) {
        console.log("Error in get messages controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getConversationMessages = getConversationMessages;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { messageId } = req.params;
        const deletedMessage = yield prisma_1.default.message.delete({
            where: { id: messageId },
        });
        if (!deletedMessage) {
            res.status(404).json({ error: "Message not found" });
            return;
        }
        res.status(200).json({ deleted: deletedMessage });
    }
    catch (error) {
        console.log("Error in delete message controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteMessage = deleteMessage;
const createConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username: reciever } = req.params;
        const sender = req.user.username;
        let conversation = yield prisma_1.default.conversations.findFirst({
            where: {
                AND: [
                    {
                        users: {
                            some: {
                                username: sender,
                            },
                        },
                    },
                    {
                        users: {
                            some: {
                                username: reciever,
                            },
                        },
                    },
                ],
            },
        });
        // If not conversation between the users exists, create a new one.
        if (!conversation) {
            conversation = yield prisma_1.default.conversations.create({
                data: {
                    users: {
                        connect: [
                            {
                                username: sender,
                            },
                            {
                                username: reciever,
                            },
                        ],
                    },
                },
            });
        }
        res.status(200).json({ conversation });
    }
    catch (error) {
        console.log("Error in create conversation controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createConversation = createConversation;
