import { Router } from "express";
import { UserRouter } from "../modules/auth";

export const AppRouter = Router()

AppRouter.use("/api/auth/", UserRouter)