import type { NextFunction, Request, Response } from "express";
import { User } from "../../../../prisma/generated/client";
import { AuthResponse, CreateUserSchema } from "./auth.types";

export interface IUserControllerContract {
    registration: (
        req: Request<
            object, 
            AuthResponse, 
            CreateUserSchema, 
            object
        >,
        res: Response<{accessToken: string}>,
        next: NextFunction
    ) => void
}

export interface IUserServiceContract {
    createUser: (userData: CreateUserSchema) => Promise<AuthResponse>
}   

export interface IUserRepositoryContract {
    createUser: (userData: CreateUserSchema) => Promise<User>
    getUserByEmail: (email: string) => Promise<User | null>
}