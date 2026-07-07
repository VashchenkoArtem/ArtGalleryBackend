import { Request, Response, NextFunction } from "express";
import { AuthenticationError, PermissionError } from "../errors";
import { UserService } from "../modules/auth/auth.service";

export async function isAdminMiddleware(req: Request, res: Response, next: NextFunction){
    const userId = res.locals.userId
    if (!userId){
        throw new AuthenticationError("You are not in account. Please, log in")
    }
    const isUserAdmin = await UserService.isUserAdmin(userId)
    if (!isUserAdmin) {
        throw new PermissionError(
            "You do not have permission to perform this action"
        );
    }
    next()
}