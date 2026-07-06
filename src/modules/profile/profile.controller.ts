import { BadRequestError } from "../../errors";
import { ProfileService } from "./profile.service";
import { IProfileControllerContract } from "./types/profile.contracts";

export const ProfileController: IProfileControllerContract = {
    me: async (req, res, next) => {
        try {
            const userId = res.locals.userId
            const user = await ProfileService.me(userId)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const userId = res.locals.userId
            const userBody = req.body
            const updatedAvatar = req.file
            if (!userBody && !updatedAvatar){
                throw new BadRequestError("User body is missing")
            }
            const userData = {
                id: userId,
                name: userBody.name,
                email: userBody.email,
                avatar: updatedAvatar?.filename ?? undefined
            }
            const updatedUser = await ProfileService.updateUser(userData)
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }
}