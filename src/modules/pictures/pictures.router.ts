import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth-middleware";
import { PicturesController } from "./pictures.controller";
import { validateMiddleware } from "../../middlewares";
import { PictureSchema } from "./pictures.schema";
import { procImgMiddleware, uploadMiddleware } from "../../middlewares/upload-middleware";
import { isAdminMiddleware } from "../../middlewares/is-admin-middleware";

export const PicturesRouter = Router()

PicturesRouter.get(
    "/", 
    PicturesController.getPictures
)

PicturesRouter.post(
    "/", 
    AuthMiddleware, 
    isAdminMiddleware,
    uploadMiddleware.single("image"), 
    procImgMiddleware(350, 85, "Pictures"), 
    validateMiddleware(PictureSchema.create), 
    PicturesController.createPicture
)

PicturesRouter.get(
    "/:pictureId",
    AuthMiddleware,
    PicturesController.getPictureByIdWithComments
)