import { InferType } from "yup";
import { PictureSchema } from "../pictures.schema";

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