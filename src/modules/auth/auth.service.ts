import { compare, hash } from "bcryptjs";
import { AuthenticationError } from "../../errors/app-errors";
import { IUserServiceContract } from "./types/auth.contracts";
import { UserRepository } from "./auth.repository";
import { decode, sign } from "jsonwebtoken";
import { ENV } from "../../config/env";
import { randomUUID } from "crypto";

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
        }, )

        const accessToken = sign({ userId: newUser.id}, ENV.JWT_ACCESS_SECRET, { expiresIn: "15m"})
        const refreshToken = sign({ userId: newUser.id,  tokenId: randomUUID()}, ENV.JWT_REFRESH_SECRET, { expiresIn: "7d"})

        await UserRepository.createOrUpdateRefreshToken(newUser.id, refreshToken)
        return { 
            accessToken, 
            refreshToken 
        }
    },
    loginUser: async (userData) => {
        const user = await UserRepository.getUserByEmail(userData.email)
        if (!user){
            throw new AuthenticationError("User with this email does not exist")
        }
        const isPasswordValid = await compare(userData.password, user.password);
        if (!isPasswordValid) {
            throw new AuthenticationError("Invalid password");
        }

        const accessToken = sign({ userId: user.id}, ENV.JWT_ACCESS_SECRET, { expiresIn: "15m"})
        const refreshToken = sign({ userId: user.id, tokenId: randomUUID()}, ENV.JWT_REFRESH_SECRET, { expiresIn: "7d"})
        const updatedRefreshToken = await UserRepository.createOrUpdateRefreshToken(user.id, refreshToken)
        return { 
            accessToken, 
            refreshToken: updatedRefreshToken.token
        }
    }
}