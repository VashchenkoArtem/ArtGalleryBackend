import { CommentRepository } from "./comment.repository";
import { ICommentServiceContract } from "./types/comment.contracts";

export const CommentService: ICommentServiceContract = {
    createComment: async (commentData) => {
        return await CommentRepository.createComment(commentData)
    }
}