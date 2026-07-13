import { InferType } from "yup";
import { PictureSchema } from "../pictures.schema";
import { Picture, Prisma } from "../../../generated/client";

export interface PicturesQuery {
    limit?: string;
    page?: string;
}

export interface PaginationData {
    limit: number;
    page: number;
}

export interface PictureRepositoryPayload {
    limit: number;
    offset: number;
}

export type CreatePictureSchema = InferType<typeof PictureSchema.create>
export type CreatePicture = CreatePictureSchema & { image: string }

export type PictureParams = {
    pictureId: string
}
export type PicturesResponse = {
    pictures: Picture[];
    page: number;
    limit: number;
    picturesCount: number;
    totalPages: number
}
export type PictureWithComments = Prisma.PictureGetPayload<{
    include: {
        comments: {
            select: {
                id: true,
                content: true,
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        }
    }
}>