import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth-middleware";
import { PicturesController } from "./pictures.controller";
import { validateMiddleware } from "../../middlewares";
import { PictureSchema } from "./pictures.schema";

export const PicturesRouter = Router()

PicturesRouter.get("/", AuthMiddleware, PicturesController.getPictures)
PicturesRouter.post("/", AuthMiddleware, validateMiddleware(PictureSchema.create), PicturesController.createPicture)