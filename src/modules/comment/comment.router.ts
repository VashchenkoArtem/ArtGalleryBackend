import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth-middleware";
import { validateMiddleware } from "../../middlewares";
import { CommentSchema } from "./comment.schema";
import { CommentController } from "./comment.controller";

export const CommentRouter = Router()

CommentRouter.post(
    "/:pictureId",
    AuthMiddleware,
    validateMiddleware(CommentSchema.create),
    CommentController.createComment
)