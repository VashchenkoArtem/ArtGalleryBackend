import { client } from "../../client/client";
import { ConflictError, NotFoundError, PrismaErrors } from "../../errors";
import { Prisma } from "../../generated/client";
import { IUserRepositoryContract } from "./types/auth.contracts";

export const UserRepository: IUserRepositoryContract = {
    createUser: async (userData) => {
        try{
            return await client.user.create({
                data: userData
            })
        } catch(error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError
            ) {
                if (error.code === PrismaErrors.CONFLICT){
                    throw new ConflictError("User already exists");
                }
            }
            throw error
        }
    },
    createOrUpdateRefreshToken: async (userId, refreshToken) => {
        try{
            const existingToken = await client.refreshToken.findUnique({
                where: {
                    userId: userId
                }})
            if (!existingToken){
                return await client.refreshToken.create({
                    data: {
                        token: refreshToken,
                        userId: userId
                }})
            }
            return await client.refreshToken.update({
                where: {
                    userId: userId
                },
                data: {
                    token: refreshToken
                }
            })
        }catch(error){  
            if (
                error instanceof Prisma.PrismaClientKnownRequestError
            ) {
                if (error.code === PrismaErrors.CONFLICT){
                    throw new ConflictError("Refresh token already exists");
                }
                if (error.code === PrismaErrors.NOT_FOUND){
                    throw new NotFoundError("Refresh token does not found")
                }
            }
            throw error
        }
    },
    getUserByEmail: async(email) => {   
        try{
            return await client.user.findUnique({
                where: {
                    email: email
                }
            })
        }catch(error){
            throw error
        }
    },
    getRefreshTokenByUserId: async(userId) => {
        try{
            return await client.refreshToken.findUnique({
                where: {
                    userId: userId
                }
            })
        } catch (error) {
            throw error
        }
    },
    deleteRefreshToken: async(userId) => {
        try{
            await client.refreshToken.delete({
                where: {
                    userId: userId
                }
            })
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError
            ) {
                if (error.code === PrismaErrors.NOT_FOUND){
                    throw new NotFoundError("Refresh token does not found");
                }
            }
            throw error
        }
    },
    getUserStatusById: async(userId) => {
        try{
            return await client.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    isAdmin: true
                }
            })
        } catch (error) {
            throw error
        }
    },
    getUserByGoogleId: async(googleId) => {
        return await client.user.findUnique({ 
            where: { googleId },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                isAdmin: true,
                googleId: true
            }
        })
    }
}