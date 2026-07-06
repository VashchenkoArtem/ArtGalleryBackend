import type { Request, Response, NextFunction } from "express"
import { CommentParams, CreateComment, CreateCommentSchema } from "./comment.types"
import { Comment } from "../../../generated/client"

export interface ICommentControllerContract {
    createComment: (
        req: Request<
            CommentParams,
            Comment,
            CreateCommentSchema,
            object
        >,
        res: Response<Comment>,
        next: NextFunction
    ) => void
}

export interface ICommentServiceContract {
    createComment: (commentData: CreateComment) => Promise<Comment>
}

export interface ICommentRepositoryContract {
    createComment: (commentData: CreateComment) => Promise<Comment>
}