import type { NextFunction, Request, Response } from "express";
import { AuthResponse, CreateUserSchema, CreateUserWithGoogleId, GoogleAuthenticationPayload, LoginUserSchema, UserStatus } from "./auth.types";
import { RefreshToken, User } from "../../../generated/client";
import { UserWithoutPassword } from "../../profile/types/profile.types";

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
    refreshToken: (
        req: Request<
            object, 
            { accessToken: string }, 
            object, 
            object
        >,
        res: Response<{ accessToken: string }>
    ) => void;
    logout: (
        req: Request<
            object,
            string,
            object,
            object
        >,
        res: Response<string>
    ) => void;
    loginWithGoogle: (
        req: Request<
            object,
            AuthResponse,
            GoogleAuthenticationPayload,
            object
        >,
        res: Response<{accessToken: string}>,
        next: NextFunction
    ) => void
}

export interface IUserServiceContract {
    createUser: (userData: CreateUserSchema) => Promise<AuthResponse>
    loginUser: (userData: LoginUserSchema) => Promise<AuthResponse>
    refreshToken: (accessToken: string) => Promise<{ newRefreshToken: string, newAccessToken: string }>
    logoutUser: (refreshToken: string) => Promise<void>
    isUserAdmin: (userId: number) => Promise<boolean>
    loginWithGoogle: (idToken: string) => Promise<AuthResponse>
}   

export interface IUserRepositoryContract {
    createUser: (userData: CreateUserSchema | CreateUserWithGoogleId) => Promise<User>
    createOrUpdateRefreshToken: (userId: number, refreshToken: string) => Promise<RefreshToken>
    getUserByEmail: (email: string) => Promise<User | null>
    getRefreshTokenByUserId: (userId: number) => Promise<RefreshToken | null>
    deleteRefreshToken: (userId: number) => Promise<void>
    getUserStatusById: (userId: number) => Promise<UserStatus | null>
    getUserByGoogleId: (googleId: string) => Promise<UserWithoutPassword | null>
    linkGoogleAccount: (userId: number, googleId: string) => Promise<User>
}