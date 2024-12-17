import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  query: {
    message: {
      async create({ args, query }) {
        const { conversationId } = args.data;

        // Run the original create query to add the message
        const result = await query(args);

        // Update the conversation's updatedAt field
        if (conversationId) {
          await prisma.conversations.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() },
          });
        }

        return result;
      },
    },
  },
});

export default prisma;
