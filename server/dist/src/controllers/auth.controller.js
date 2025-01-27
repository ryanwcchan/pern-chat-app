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
exports.getAllUsers = exports.getMe = exports.logout = exports.login = void 0;
exports.signup = signup;
const prisma_1 = __importDefault(require("../db/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullName, username, password, confirmPassword, gender } = req.body;
            if (!fullName || !username || !password || !confirmPassword || !gender) {
                res.status(400).json({
                    error: "Please fill in fields",
                });
                return;
            }
            if (password !== confirmPassword) {
                res.status(400).json({
                    error: "Password and confirm password not match",
                });
                return;
            }
            const user = yield prisma_1.default.user.findUnique({
                where: {
                    username,
                },
            });
            if (user) {
                res.status(400).json({
                    error: "User already exist",
                });
                return;
            }
            // Hash Password
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            // Profile pic
            const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
            const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
            // Create User
            const newUser = yield prisma_1.default.user.create({
                data: {
                    fullName,
                    username,
                    password: hashedPassword,
                    gender,
                    profilePic: gender === "male" ? maleProfilePic : femaleProfilePic,
                },
            });
            if (newUser) {
                // Generate token
                (0, generateToken_1.default)(newUser.id, res);
                res.status(201).json({
                    id: newUser.id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    profilePic: newUser.profilePic,
                });
            }
            else {
                res.status(400).json({ error: "Invalid user data" });
            }
        }
        catch (error) {
            console.log("Error in signup controller", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield prisma_1.default.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) {
            res.status(400).json({
                error: "Invalid credentials",
            });
            return;
        }
        const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            res.status(400).json({
                error: "Invalid credentials",
            });
            return;
        }
        (0, generateToken_1.default)(user.id, res);
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    }
    catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.logout = logout;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const user = yield prisma_1.default.user.findUnique({
            where: { id: req.user.id },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            gender: user.gender,
        });
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getMe = getMe;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany({
            select: {
                id: true,
                fullName: true,
                username: true,
                gender: true,
                profilePic: true,
                createdAt: true,
            },
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllUsers = getAllUsers;
