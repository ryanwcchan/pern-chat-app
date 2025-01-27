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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient().$extends({
    query: {
        message: {
            create(_a) {
                return __awaiter(this, arguments, void 0, function* ({ args, query }) {
                    const { conversationId } = args.data;
                    // Run the original create query to add the message
                    const result = yield query(args);
                    // Update the conversation's updatedAt field
                    if (conversationId) {
                        yield prisma.conversations.update({
                            where: { id: conversationId },
                            data: { updatedAt: new Date() },
                        });
                    }
                    return result;
                });
            },
        },
    },
});
exports.default = prisma;
