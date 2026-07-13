import { BadRequestError, PermissionError } from "../../errors";
import { PicturesRepository } from "./pictures.repository";
import { IPicturesServiceContract } from "./types/pictures.contracts";

export const PicturesService: IPicturesServiceContract = {
    getPictures: async (paginationData) => {
        const { limit, page } = paginationData
        const payload = {
            limit: limit,
            offset: page > 0 
                ? (page - 1) * limit
                : 0
        }
        const pictures = await PicturesRepository.getPictures(payload)
        const picturesCount = await PicturesRepository.countPictures()
        return {
            pictures,
            page,
            limit,
            picturesCount,
            totalPages: Math.ceil(picturesCount / limit),
        };
    },
    createPicture: async (pictureData) => {
        return await PicturesRepository.createPicture(pictureData)
    },
    getPictureByIdWithComments: async (pictureId) => {
        const pictureWithComments = await PicturesRepository.getPictureByIdWithComments(pictureId)
        if (!pictureWithComments){
            throw new BadRequestError("Picture with this id does not exist")
        }
        return pictureWithComments
    }
}