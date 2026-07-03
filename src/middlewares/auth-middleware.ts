import type { NextFunction, Request, Response } from "express";
import { AuthenticationError, BadRequestError } from "../errors/app-errors";
import { ENV } from "../config/env";
import { verify } from "jsonwebtoken";

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorizationHeaders = req.headers.authorization;
    if (!authorizationHeaders) {
        throw new BadRequestError("Authorization header is missing");
    }
    const [tokenType, token] = authorizationHeaders.split(" ");
    if (tokenType !== "Bearer" || !token){
        throw new BadRequestError("Entered wrong credentials in authorization header")
    }
    try {
        const secret = ENV.JWT_ACCESS_SECRET
        const decodedToken = verify(token, secret) as unknown as { id: number }
        
        res.locals.userId = decodedToken.id
        next()
    }catch(error){
        throw new AuthenticationError("Problem with user data. Please, try again")
    }
}