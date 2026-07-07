import type { NextFunction, Request, Response } from "express";
import { ENV } from "../config/env";
import { verify } from "jsonwebtoken";
import { AuthenticationError, BadRequestError } from "../errors";

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
        const decodedToken = verify(token, secret) as unknown as { userId: number }
        
        res.locals.userId = decodedToken.userId
        next()
    }catch(error){
        throw new AuthenticationError("You are not in account. Please, log in")
    }
}