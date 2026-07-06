import { client } from "../../client/client";
import { ICollectionsRepositoryContract } from "./types/collections.contracts";

export const CollectionsRepository: ICollectionsRepositoryContract = {
    getCollections: async () => {
        return await client.collection.findMany({})
    }
}