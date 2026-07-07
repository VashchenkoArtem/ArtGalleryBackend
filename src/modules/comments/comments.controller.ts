import { BadRequestError } from "../../errors";
import { CommentService } from "./comments.service";
import { ICommentControllerContract } from "./types/comments.contracts";

export const CommentController: ICommentControllerContract = {
    createComment: async (req, res, next) => {
        try {
            const commentData = req.body
            const userId = res.locals.userId
            const pictureId = Number(req.params.pictureId)

            if (!commentData || !pictureId){
                throw new BadRequestError("Comment data is missing")
            }
            
            const commentDataWithIds = {
                ...commentData,
                userId,
                pictureId
            }
            const comment = await CommentService.createComment(commentDataWithIds)
            res.status(201).json(comment)
        } catch (error) { 
            next(error)
        }
    }
}