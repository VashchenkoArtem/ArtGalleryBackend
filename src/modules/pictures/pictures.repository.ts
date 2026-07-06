import { client } from "../../client/client";
import { BadRequestError, ConflictError, PrismaErrors } from "../../errors";
import { Prisma } from "../../generated/client";
import { IPicturesRepositoryContract } from "./types/pictures.contracts";

export const PicturesRepository: IPicturesRepositoryContract = {
    getPictures: async (paginationData) => {
        return await client.picture.findMany({
            skip: paginationData.offset,
            take: paginationData.limit
        })
    },
    createPicture: async (pictureData) => {
        try {
            return await client.picture.create({
                data: pictureData
            })
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError
            ) {
                if (error.code === PrismaErrors.CONFLICT){
                    throw new ConflictError("Picture already exists");
                }
                if (error.code === PrismaErrors.FOREIGN_KEY){
                    throw new BadRequestError("Collection with this id does not exist")
                }
            }

            throw error;
        }
    },
    getPictureByIdWithComments: async (pictureId) => {
        const picture =  await client.picture.findUnique({
            where: {
                id: pictureId
            },
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
        })
        if (!picture){
            throw new BadRequestError("Picture with this id does not exist")
        }
        return picture
    }
}