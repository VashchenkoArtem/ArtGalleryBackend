import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth-middleware";
import { validateMiddleware } from "../../middlewares";
import { CommentSchema } from "./comments.schema";
import { CommentController } from "./comments.controller";

export const CommentRouter = Router()

CommentRouter.post(
    "/:pictureId",
    AuthMiddleware,
    validateMiddleware(CommentSchema.create),
    CommentController.createComment
)