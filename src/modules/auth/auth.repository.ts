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
    }
}