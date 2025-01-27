"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const message_route_1 = __importDefault(require("./routes/message.route"));
const socket_1 = require("./socket/socket");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const allowedOrigin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}` // e.g., https://your-vercel-project.vercel.app
    : "*";
socket_1.app.use((0, cors_1.default)({
    origin: allowedOrigin, // Allow requests from any origin
    credentials: true, // If your API needs cookies to be sent
}));
socket_1.app.use((0, cookie_parser_1.default)());
socket_1.app.use(express_1.default.json());
socket_1.app.use("/api/auth", auth_route_1.default);
socket_1.app.use("/api/chats", message_route_1.default);
socket_1.server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
