import { CollectionsRepository } from "./collections.repository";
import { ICollectionsServiceContract } from "./types/collections.contracts";

export const CollectionsService: ICollectionsServiceContract = {
    getCollections: async () => {
        return await CollectionsRepository.getCollections()
    }
}