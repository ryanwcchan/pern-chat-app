import { Request, Response } from "express";
import prisma from "../db/prisma";

export const sendMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user.id;

    // Check for existing conversations where conversation users has senderId and recieverId
    let conversation = await prisma.conversations.findFirst({
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
      conversation = await prisma.conversations.create({
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
    const newMessage = await prisma.message.create({
      data: {
        content: message,
        userId: senderId,
        conversationId: conversation.id,
      },
    });

    res.status(200).json({
      message: newMessage,
      conversation: conversation,
    });
  } catch (error) {
    console.log("Error in send message controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getConversations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id;
    const conversations = await prisma.conversations.findMany({
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
    });
    res.status(200).json({ conversations: conversations });
  } catch (error) {
    console.log("Error in get conversations controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getConversationMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { conversationId } = req.params;
    console.log("conversationId:", conversationId);

    const conversation = await prisma.conversations.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }

    const messages = await prisma.message.findMany({
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
        updatedAt: "desc", // Sort messages by creation date (ascending)
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in get messages controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { messageId } = req.params;
    const deletedMessage = await prisma.message.delete({
      where: { id: messageId },
    });

    if (!deletedMessage) {
      res.status(404).json({ error: "Message not found" });
      return;
    }

    res.status(200).json({ deleted: deletedMessage });
  } catch (error) {
    console.log("Error in delete message controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const getMessages = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id: recieverId } = req.params;
//     const senderId = req.user.id;

//     const conversation = await prisma.conversation.findFirst({
//       where: {
//         participantIds: {
//           hasEvery: [senderId, recieverId],
//         },
//       },
//       include: {
//         messages: {
//           orderBy: {
//             createdAt: "asc",
//           },
//         },
//       },
//     });

//     if (!conversation) {
//       res.status(200).json([]);
//       return;
//     }

//     res.status(200).json(conversation.messages);
//   } catch (error) {
//     console.log("Error in get messages controller", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getConversations = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const authUserId = req.user.id;

//     const conversations = await prisma.conversation.findMany({
//       where: {
//         participantIds: {
//           has: authUserId,
//         },
//       },
//       include: {
//         participants: {
//           select: {
//             id: true,
//             fullName: true,
//             profilePic: true,
//           },
//         },
//         messages: {
//           orderBy: {
//             createdAt: "asc",
//           },
//         },
//       },
//     });

//     res.status(200).json(conversations);
//   } catch (error) {
//     console.log("Error in get conversation participants controller", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
