import { CollectionsService } from "./collections.service";
import { ICollectionsControllerContract } from "./types/collections.contracts";

export const CollectionsController: ICollectionsControllerContract = {
    getCollections: async (req, res, next) => {
        try {
            const collections = await CollectionsService.getCollections()
            return res.status(200).json(collections)
        } catch (error) {
            next(error)
        }
    }
}