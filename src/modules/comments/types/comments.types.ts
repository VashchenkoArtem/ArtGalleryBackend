import { InferType } from "yup"
import { CommentSchema } from "../comments.schema"

export type CommentParams = {
    pictureId: string
}

export type CreateCommentSchema = InferType<typeof CommentSchema.create>
export type CreateComment = 
    CreateCommentSchema & {
        pictureId: number;
        userId: number
    }