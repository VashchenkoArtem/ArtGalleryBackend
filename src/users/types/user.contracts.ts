import type { Request, Response } from "express";
import { User } from "../../../prisma/generated/client";
import { CreateUserDto } from "./user.types";

export interface IUserControllerContract {
    registration: (
        req: Request<object, User | string, CreateUserDto, object>,
        res: Response<User | string>
    ) => void
}

export interface IUserServiceContract {
    createUser: (userData: CreateUserDto) => Promise<User>
}

export interface IUserRepositoryContract {
    createUser: (userData: CreateUserDto) => Promise<User>
}