import { client } from "../../client/client";
import { IPicturesRepositoryContract } from "./types/pictures.contracts";

export const PicturesRepository: IPicturesRepositoryContract = {
    getPictures: async (paginationData) => {
        try {
            return await client.picture.findMany({
                skip: paginationData.offset,
                take: paginationData.limit
            })
        } catch (error) {
            throw error
        }
    },
    createPicture: async (pictureData) => {
        try {
            return await client.picture.create({
                data: pictureData
            })
        } catch (error) {
            throw error
        }
    }
}