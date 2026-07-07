import { client } from "../../client/client";
import { BadRequestError, PrismaErrors } from "../../errors";
import { Prisma } from "../../generated/client";
import { IProfileRepositoryContract } from "./types/profile.contracts";

export const ProfileRepository: IProfileRepositoryContract = {
    me: async(userId) => {
        return await client.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                isAdmin: true,
                googleId: true
            }
        })
    },
    updateUser: async(userData) => {
        try {
            const { id, name, email, avatar } = userData

            return await client.user.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    email,
                    avatar
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true,
                    isAdmin: true,
                    googleId: true
                }
            })
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError
            ) {
                if (error.code === PrismaErrors.NOT_FOUND){
                    throw new BadRequestError("User does not exist")
                }
            }

            throw error;
        }
    }
}