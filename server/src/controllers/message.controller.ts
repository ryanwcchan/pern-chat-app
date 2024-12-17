import { Request, Response } from "express"
import prisma from "../db/prisma"

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message } = req.body
        const { id: recieverId } = req.params
        const senderId = req.user.id

        let conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, recieverId]
                }
            }
        })

        // Create new conversation if one does not exist
        if(!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participantIds: {
                        set: [senderId, recieverId]
                    }
                }
            })
        }

        // Create new message
        const newMessage = await prisma.message.create({
            data: {
                body: message,
                senderId,
                conversationId: conversation.id
            }
        })

        // Add new message to conversation
        if(newMessage) {
            await prisma.conversation.update({
                where: {
                    id: conversation.id
                },
                data: {
                    messages: {
                        connect: {
                            id: newMessage.id
                        }
                    }
                }
            })
        }

        // Socket io

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in send message controller", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: recieverId } = req.params
        const senderId = req.user.id

        const conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, recieverId]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        })

        if(!conversation) {
            res.status(200).json([])
            return
        }

        res.status(200).json(conversation.messages)
    } catch (error) {
        console.log("Error in get messages controller", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getConversations = async (req: Request, res: Response): Promise<void> => {
    try {
        const authUserId = req.user.id
        const conversations = await prisma.conversation.findMany({
            where: {
                participantIds: {
                    has: authUserId
                }
            },
            include: {
                participants: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePic: true
                    }
                },
                messages: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })

        res.status(200).json(conversations)
    } catch (error) {
        console.log("Error in get conversation participants controller", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}