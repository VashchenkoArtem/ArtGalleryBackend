import { compare, hash } from "bcryptjs";
import { IUserServiceContract } from "./types/auth.contracts";
import { UserRepository } from "./auth.repository";
import { sign, verify } from "jsonwebtoken";
import { ENV } from "../../config/env";
import { randomUUID } from "crypto";
import { AuthenticationError, BadRequestError } from "../../errors";
import { hashToken } from "../../utils/hash-token";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(ENV.GOOGLE_CLIENT_ID);

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
        const refreshToken = sign({ userId: newUser.id, tokenId: randomUUID() }, ENV.JWT_REFRESH_SECRET, { expiresIn: "7d" })

        await UserRepository.createOrUpdateRefreshToken(newUser.id, hashToken(refreshToken))
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
        if (!user.password) {
            throw new AuthenticationError("This account uses Google sign-in, please log in with Google")
        }
        const isPasswordValid = await compare(userData.password, user.password);
        if (!isPasswordValid) {
            throw new AuthenticationError("Invalid password");
        }
        const accessToken = sign({ userId: user.id}, ENV.JWT_ACCESS_SECRET, { expiresIn: "15m"})
        const refreshToken = sign({ userId: user.id, tokenId: randomUUID()}, ENV.JWT_REFRESH_SECRET, { expiresIn: "7d"})

        await UserRepository.createOrUpdateRefreshToken(user.id, hashToken(refreshToken))
        return { 
            accessToken, 
            refreshToken: refreshToken
        }
    },
    refreshToken: async (refreshToken) => {
        const verifiedToken = verify(refreshToken, ENV.JWT_REFRESH_SECRET) as { userId: number }
        const userId = verifiedToken.userId
        const userToken = await UserRepository.getRefreshTokenByUserId(userId)

        if (!userToken || userToken.token !== hashToken(refreshToken)){
            throw new AuthenticationError("Invalid refresh token")
        }

        const newAccessToken = sign({ userId: userId}, ENV.JWT_ACCESS_SECRET, { expiresIn: "15m"})
        const newRefreshToken = sign({ userId: userId, tokenId: randomUUID()}, ENV.JWT_REFRESH_SECRET, { expiresIn: "7d"})

        await UserRepository.createOrUpdateRefreshToken(userId, hashToken(newRefreshToken))

        return { newAccessToken: newAccessToken, newRefreshToken: newRefreshToken }
    },
    logoutUser: async (refreshToken) => {
        const verifiedToken = verify(refreshToken, ENV.JWT_REFRESH_SECRET) as { userId: number }
        const userId = verifiedToken.userId
        const userToken = await UserRepository.getRefreshTokenByUserId(userId)
        if (!userToken || userToken.token !== hashToken(refreshToken)){
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
    },
    loginWithGoogle: async (idToken) => {
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: ENV.GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload()
        if (!payload || !payload.email || !payload.email_verified){
            throw new AuthenticationError("Invalid or unverified Google account")
        }
        let user = await UserRepository.getUserByEmail(payload.email)
        if (!user) {
            user = await UserRepository.createUser({
                name: payload.name ?? "Google User",
                email: payload.email,
                password: undefined,
                googleId: payload.sub,
                avatar: payload.picture
            })
        }
        if (user && !user.googleId) {
            user = await UserRepository.linkGoogleAccount(user.id, payload.sub)
        }

        const accessToken = sign({ userId: user.id }, ENV.JWT_ACCESS_SECRET, { expiresIn: "15m" })
        const refreshToken = sign({ userId: user.id, tokenId: randomUUID() }, ENV.JWT_REFRESH_SECRET, { expiresIn: "7d" })
        await UserRepository.createOrUpdateRefreshToken(user.id, hashToken(refreshToken))

        return { accessToken, refreshToken }
    }
}