import { Router } from "express";
import { UserRouter } from "../modules/auth";
import { PicturesRouter } from "../modules/pictures";
import { CollectionsRouter } from "../modules/collections";
import { ProfileRouter } from "../modules/profile";
import { CommentRouter } from "../modules/comments";

export const AppRouter = Router()

AppRouter.use("/api/auth/", UserRouter)
AppRouter.use("/api/pictures/", PicturesRouter)
AppRouter.use("/api/collections/", CollectionsRouter)
AppRouter.use("/api/comment/", CommentRouter)
AppRouter.use("/api/profile/", ProfileRouter)