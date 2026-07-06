import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth-middleware";
import { ProfileController } from "./profile.controller";
import { procImgMiddleware, uploadMiddleware } from "../../middlewares/upload-middleware";
import { validateMiddleware } from "../../middlewares";
import { ProfileSchema } from "./profile.schema";

export const ProfileRouter = Router()

ProfileRouter.get(
    "/me", 
    AuthMiddleware,
    ProfileController.me
)

ProfileRouter.patch(
    "/update",
    AuthMiddleware,
    uploadMiddleware.single("avatar"),
    procImgMiddleware(400, 85, "Avatars"),
    validateMiddleware(ProfileSchema.update),
    ProfileController.updateUser
)