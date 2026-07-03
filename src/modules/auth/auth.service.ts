import { hash } from "bcryptjs";
import { AuthenticationError } from "../../errors/app-errors";
import { IUserServiceContract } from "./types/auth.contracts";
import { UserRepository } from "./auth.repository";
import { sign } from "jsonwebtoken";
import { ENV } from "../../config/env";

export const UserService: IUserServiceContract = {
    createUser: async (userData) => {
        const existingUser = await UserRepository.getUserByEmail(userData.email)
        if (existingUser){
            throw new AuthenticationError("User with this email already exists")
        }
        const hashedPassword = await hash(userData.password, 10)
        const newUser = await UserRepository.createUser({ 
            ...userData, 
            password: hashedPassword 
        })
        const accessToken = sign({ userId: newUser.id}, ENV.JWT_SECRET, { expiresIn: "15m"})
        const refreshToken = sign({ userId: newUser.id}, ENV.JWT_SECRET, { expiresIn: "7d"})
        
        return { 
            accessToken, 
            refreshToken 
        }
    }
}