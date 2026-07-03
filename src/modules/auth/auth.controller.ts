import { AuthenticationError, BadRequestError } from "../../errors/app-errors";
import { IUserControllerContract } from "./types/auth.contracts";
import { UserService } from "./auth.service";
import { ENV } from "../../config/env";

export const UserController: IUserControllerContract = {
    registration: async (req, res, next) => {
        try {
            const userData = req.body;
            if (!userData){
                throw new BadRequestError("Request body is missing");
            }
            const { accessToken, refreshToken } = await UserService.createUser(userData)
            res.cookie("refreshToken", refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            })
            res.status(201).json({ accessToken })
        } catch (error) {
            next(error)
        }
    },
    login: async (req, res, next) => {
        try {
            const userData = req.body;
            if (!userData){
                throw new BadRequestError("Request body is missing");
            }
            const { accessToken, refreshToken } = await UserService.loginUser(userData)
            res.cookie("refreshToken", refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            })
            res.status(200).json({ accessToken })
        } catch (error) {
            next(error)
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken){
                throw new BadRequestError("Refresh token is missing");
            }
            const { newRefreshToken, newAccessToken } = await UserService.refreshToken(refreshToken)
            res.cookie("refreshToken", newRefreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            })
            res.status(200).json({ accessToken: newAccessToken })
        } catch (error) {
            throw new AuthenticationError(
                "Invalid refresh token"
            );
        }
    },
    logout: async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken){
                throw new BadRequestError("Refresh token is missing");
            }
            await UserService.logoutUser(refreshToken)
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            })
            res.status(200).json("Logout successful")
        } catch (error) {
            throw new AuthenticationError(
                "Invalid refresh token"
            );
        }
    }
}