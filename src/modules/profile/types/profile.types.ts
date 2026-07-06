import { InferType } from "yup";
import { User } from "../../../generated/client";
import { ProfileSchema } from "../profile.schema";

export type UserWithoutPassword = Omit<User, "password">
export type UpdateUserSchema = InferType<typeof ProfileSchema.update>

export type UpdateUser = UpdateUserSchema & { avatar?: string }

export type UserData = { id: number } & UpdateUser