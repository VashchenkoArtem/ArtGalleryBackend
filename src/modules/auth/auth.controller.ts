import { BadRequestError } from "../../errors/app-errors";
import { IUserControllerContract } from "./types/auth.contracts";
import { UserService } from "./auth.service";

export const UserController: IUserControllerContract = {
    registration: async (req, res, next) => {
        try {
            const userData = req.body;
            if (!userData){
                throw new BadRequestError("Request body is missing");
            }
            const { accessToken, refreshToken } = await UserService.createUser(userData)
            res.cookie("refreshToken", refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            res.status(201).json({ accessToken })
        } catch (error) {
            next(error)
        }
    }
}