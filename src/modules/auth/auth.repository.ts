import { client } from "../../client/client";
import { IUserRepositoryContract } from "./types/auth.contracts";

export const UserRepository: IUserRepositoryContract = {
    createUser: async (userData) => {
        try{
            return await client.user.create({
                data: userData
            })
        } catch(error) {
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
            console.log(error)
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
    }
}