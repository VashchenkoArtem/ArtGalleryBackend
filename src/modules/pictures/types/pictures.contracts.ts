import type { NextFunction, Request, Response } from "express" 
import { Picture } from "../../../generated/client"
import { CreatePicture, CreatePictureSchema, PaginationData, PictureRepositoryPayload, PicturesQuery } from "./pictures.types"

export interface IPicturesControllerContact {
    getPictures: (
        req: Request<
            object, 
            Picture[], 
            object, 
            PicturesQuery
        >,
        res: Response<Picture[]>,
        next: NextFunction
    ) => void;
    createPicture: (
        req: Request<
            object,
            Picture,
            CreatePictureSchema,
            object
        >,
        res: Response<Picture>,
        next: NextFunction
    ) => void
}

export interface IPicturesServiceContract {
    getPictures: (paginationData: PaginationData) => Promise<Picture[]>
    createPicture: (pictureData: CreatePicture, isUserAdmin: boolean) => Promise<Picture>
}

export interface IPicturesRepositoryContract {
    getPictures: (paginationData: PictureRepositoryPayload) => Promise<Picture[]>
    createPicture: (pictureData: CreatePicture) => Promise<Picture>
}