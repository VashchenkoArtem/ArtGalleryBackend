import type { Request, Response, NextFunction } from "express"
import { Collection } from "../../../generated/client"

export interface ICollectionsControllerContract {
    getCollections: (
        req: Request<
            object,
            Collection[],
            object,
            object    
        >,
        res: Response<Collection[]>,
        next: NextFunction
    ) => void
}

export interface ICollectionsServiceContract {
    getCollections: () => Promise<Collection[]>
}

export interface ICollectionsRepositoryContract {
    getCollections: () => Promise<Collection[]>
}