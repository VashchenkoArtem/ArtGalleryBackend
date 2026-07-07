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
        return await PicturesRepository.getPictures(payload)
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