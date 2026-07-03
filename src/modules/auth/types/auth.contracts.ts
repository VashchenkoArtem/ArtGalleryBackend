import type { NextFunction, Request, Response } from "express";
import { AuthResponse, CreateUserSchema, LoginUserSchema } from "./auth.types";
import { RefreshToken, User } from "../../../generated/client";

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
    ) => void;
    login: (
        req: Request<
            object,
            AuthResponse,
            LoginUserSchema,
            object
        >,
        res: Response<{accessToken: string}>,
        next: NextFunction
    ) => void;
}

export interface IUserServiceContract {
    createUser: (userData: CreateUserSchema) => Promise<AuthResponse>
    loginUser: (userData: LoginUserSchema) => Promise<AuthResponse>
}   

export interface IUserRepositoryContract {
    createUser: (userData: CreateUserSchema) => Promise<User>
    createOrUpdateRefreshToken: (userId: number, refreshToken: string) => Promise<RefreshToken>
    getUserByEmail: (email: string) => Promise<User | null>
}