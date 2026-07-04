import { Router } from "express";
import { UserRouter } from "../modules/auth";
import { PicturesRouter } from "../modules/pictures";

export const AppRouter = Router()

AppRouter.use("/api/auth/", UserRouter)
AppRouter.use("/api/pictures/", PicturesRouter)