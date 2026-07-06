import { PermissionError } from "../../errors";
import { PicturesRepository } from "./pictures.repository";
import { IPicturesServiceContract } from "./types/pictures.contracts";

export const PicturesService: IPicturesServiceContract = {
    getPictures: async (paginationData) => {
        const { limit, page } = paginationData
        const payload = {
            limit: limit,
            offset: page > 0 
                ? (page - 1) * 15 
                : 0
        }
        return await PicturesRepository.getPictures(payload)
    },
    createPicture: async (pictureData, isUserAdmin) => {
        if (!isUserAdmin){
            throw new PermissionError("User is not admin")
        }
        return await PicturesRepository.createPicture(pictureData)
    },
    getPictureByIdWithComments: async (pictureId) => {
        return await PicturesRepository.getPictureByIdWithComments(pictureId)
    }
}