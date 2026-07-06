import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth-middleware";
import { CollectionsController } from "./collections.controller";

export const CollectionsRouter = Router()

CollectionsRouter.get(
    "/", 
    AuthMiddleware,
    CollectionsController.getCollections
)