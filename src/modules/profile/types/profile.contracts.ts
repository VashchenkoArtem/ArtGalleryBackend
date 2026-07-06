import type { Request, Response, NextFunction } from "express"
import { UpdateUserSchema, UserData, UserWithoutPassword } from "./profile.types"

export interface IProfileControllerContract {
    me: (
        req: Request<
            object,
            UserWithoutPassword,
            object,
            object
        >,
        res: Response<UserWithoutPassword>,
        next: NextFunction
    ) => void;
    updateUser: (
        req: Request<
            object,
            UserWithoutPassword,
            UpdateUserSchema,
            object   
        >,
        res: Response<UserWithoutPassword>,
        next: NextFunction
    ) => void
}

export interface IProfileServiceContract {
    me: (userId: number) => Promise<UserWithoutPassword>
    updateUser: (userData: UserData) => Promise<UserWithoutPassword>
}

export interface IProfileRepositoryContract {
    me: (userId: number) => Promise<UserWithoutPassword | null>
    updateUser: (userData: UserData) => Promise<UserWithoutPassword>
}