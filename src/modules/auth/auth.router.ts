import { Router } from "express";
import { UserController } from "./auth.controller";
import { validateMiddleware } from "../../middlewares";
import { UserSchema } from "./auth.schema";

export const UserRouter = Router()

UserRouter.post("/register",validateMiddleware(UserSchema.registration), UserController.registration)
UserRouter.post("/login", validateMiddleware(UserSchema.login), UserController.login)
UserRouter.post("/refresh", UserController.refreshToken)
UserRouter.post("/logout", UserController.logout)