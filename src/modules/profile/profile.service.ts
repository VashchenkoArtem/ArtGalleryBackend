import { BadRequestError } from "../../errors";
import { ProfileRepository } from "./profile.repository";
import { IProfileServiceContract } from "./types/profile.contracts";

export const ProfileService: IProfileServiceContract = {
    me: async (userId) => {
        const user = await ProfileRepository.me(userId)
        if (!user){
            throw new BadRequestError("User with this id does not exist")
        }
        return user
    },
    updateUser: async (userData) => {
        const updatedUser = await ProfileRepository.updateUser(userData)
        return updatedUser
    }
}