import { CommentRepository } from "./comments.repository";
import { ICommentServiceContract } from "./types/comments.contracts";

export const CommentService: ICommentServiceContract = {
    createComment: async (commentData) => {
        return await CommentRepository.createComment(commentData)
    }
}