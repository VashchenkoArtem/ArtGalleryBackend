import { InferType } from "yup"
import { UserSchema } from "../auth.schema"
import { Prisma } from "../../../generated/client";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string
}
export type CreateUserSchema = InferType<typeof UserSchema.registration>
export type LoginUserSchema = InferType<typeof UserSchema.login>