import { InferType } from "yup"
import { UserSchema } from "../auth.schema"

export interface AuthResponse {
    accessToken: string;
    refreshToken: string
}
export type CreateUserSchema = InferType<typeof UserSchema.registration>