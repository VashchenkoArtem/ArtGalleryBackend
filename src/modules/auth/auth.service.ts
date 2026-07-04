import { compare, hash } from "bcryptjs";
import { AuthenticationError } from "../../errors/app-errors";
import { IUserServiceContract } from "./types/auth.contracts";
import { UserRepository } from "./auth.repository";
import { sign, verify } from "jsonwebtoken";
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

        await UserRepository.createOrUpdateRefreshToken(user.id, refreshToken)
        return { 
            accessToken, 
            refreshToken: refreshToken
        }
    },
    refreshToken: async (refreshToken) => {
        const verifiedToken = verify(refreshToken, ENV.JWT_REFRESH_SECRET) as { userId: number }
        const userId = verifiedToken.userId
        const userToken = await UserRepository.getRefreshTokenByUserId(userId)

        if (!userToken || userToken.token !== refreshToken){
            throw new AuthenticationError("Invalid refresh token")
        }

        const newAccessToken = sign({ userId: userId}, ENV.JWT_ACCESS_SECRET, { expiresIn: "15m"})
        const newRefreshToken = sign({ userId: userId, tokenId: randomUUID()}, ENV.JWT_REFRESH_SECRET, { expiresIn: "7d"})

        await UserRepository.createOrUpdateRefreshToken(userId, newRefreshToken)

        return { newAccessToken: newAccessToken, newRefreshToken: newRefreshToken }
    },
    logoutUser: async (refreshToken) => {
        const verifiedToken = verify(refreshToken, ENV.JWT_REFRESH_SECRET) as { userId: number }
        const userId = verifiedToken.userId
        const userToken = await UserRepository.getRefreshTokenByUserId(userId)
        if (!userToken || userToken.token !== refreshToken){
            throw new AuthenticationError("Invalid refresh token")
        }
        return await UserRepository.deleteRefreshToken(userId)
    },
    isUserAdmin: async (userId) => {
        const userStatus = await UserRepository.getUserStatusById(userId)
        if (!userStatus){
            throw new AuthenticationError("User with this email does not exist")
        }
        return userStatus.isAdmin
    }
}