import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken";

async function signup(req: Request, res: Response): Promise<void> {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body

        if(!fullName || !username || !password || !confirmPassword || !gender) {
            res.status(400).json({
                error: "Please fill in fields"
            })
            return
        }

        if (password !== confirmPassword) {
            res.status(400).json({
                error: "Password and confirm password not match"
            })
            return
        }

        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (user) {
            res.status(400).json({
                error: "User already exist"
            })
            return
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Profile pic
        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        // Create User
        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === "male" ? maleProfilePic : femaleProfilePic
            }
        })

        if(newUser) {
            // Generate token
            generateToken(newUser.id, res)

            res.status(201).json({
                id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ error: "Invalid user data" })
        }

    } catch (error: any) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body

        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (!user) {
            res.status(400).json({
                error: "Invalid credentials"
            })
            return
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            res.status(400).json({
                error: "Invalid credentials"
            })
            return
        }

        generateToken(user.id, res)

        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error: any) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logout successful" })
    } catch (error: any) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getMe = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        })

        if(!user) {
            res.status(404).json({ error: "User not found" })
            return
        }

        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })
        
    } catch (error: any) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export { signup }