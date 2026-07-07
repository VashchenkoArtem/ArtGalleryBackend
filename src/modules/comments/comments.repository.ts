import { client } from "../../client/client";
import { BadRequestError, ConflictError, PrismaErrors } from "../../errors";
import { Prisma } from "../../generated/client";
import { ICommentRepositoryContract } from "./types/comments.contracts";

export const CommentRepository: ICommentRepositoryContract = {
    createComment: async (commentData) => {
        try {
            return await client.comment.create({
                data: commentData
            })
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError
            ) {
                if (error.code === PrismaErrors.FOREIGN_KEY){
                    throw new BadRequestError("Picture with this id does not exist")
                }
            }
            throw error
        }
    }
}