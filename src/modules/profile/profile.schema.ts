import * as yup from "yup"

export const ProfileSchema = {
    update: yup.object({
        name: yup.string().max(100, "Name must contain fewer than 100 characters"),
        email: yup.string().email("Invalid email format")
    })
}