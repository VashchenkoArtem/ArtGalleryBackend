import multer, { memoryStorage } from "multer";
import sharp from "sharp";
import type { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";
import { UploadApiResponse } from "cloudinary";

export const uploadMiddleware = multer({
    storage: memoryStorage(),
});

function uploadBuffer(
    buffer: Buffer,
    folderName: string
): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: folderName,
            },
            (error, result) => {
                if (error) return reject(error);
                if (!result) {
                    return reject(
                        new Error("Cloudinary returned no result")
                    );
                }

                resolve(result);
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
}

interface CloudinaryFile extends Express.Multer.File {
    secure_url?: string;
}

export function procImgMiddleware(
    width: number,
    quality: number,
    folderName: string
) {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.file) {
                return next();
            }
            const file = req.file as CloudinaryFile;

            const buffer = await sharp(file.buffer)
                .resize({
                    width,
                    withoutEnlargement: true,
                })
                .flatten({ background: "#ffffff" })
                .jpeg({ quality })
                .toBuffer();

            const result = await uploadBuffer(
                buffer,
                folderName
            );

            file.filename = result.public_id;
            file.secure_url = result.secure_url;

            next();
        } catch (error) {
            next(error);
        }
    };
}