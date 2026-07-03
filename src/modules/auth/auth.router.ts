import { Router } from "express";
import { UserController } from "./auth.controller";

export const UserRouter = Router()

UserRouter.post("/register", UserController.registration)
UserRouter.post("/login", UserController.login)