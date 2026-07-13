import type { NextFunction, Request, Response } from "express" 
import { Picture } from "../../../generated/client"
import { CreatePicture, CreatePictureSchema, PaginationData, PictureParams, PictureRepositoryPayload, PicturesQuery, PicturesResponse, PictureWithComments } from "./pictures.types"

export interface IPicturesControllerContact {
    getPictures: (
        req: Request<
            object, 
            PicturesResponse    , 
            object, 
            PicturesQuery
        >,
        res: Response<PicturesResponse>,
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
    ) => void;
    getPictureByIdWithComments: (
        req: Request<
            PictureParams,
            PictureWithComments,
            object,
            object
        >,
        res: Response<PictureWithComments>,
        next: NextFunction
    ) => void
}

export interface IPicturesServiceContract {
    getPictures: (paginationData: PaginationData) => Promise<PicturesResponse>
    createPicture: (pictureData: CreatePicture) => Promise<Picture>
    getPictureByIdWithComments: (pictureId: number) => Promise<PictureWithComments>
}

export interface IPicturesRepositoryContract {
    getPictures: (paginationData: PictureRepositoryPayload) => Promise<Picture[]>
    createPicture: (pictureData: CreatePicture) => Promise<Picture>
    getPictureByIdWithComments: (pictureId: number) => Promise<PictureWithComments | null>
    countPictures: () => Promise<number>
}