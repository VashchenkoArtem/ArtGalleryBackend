import * as yup from "yup"

export const UserSchema = {
    registration: yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
    }),
    login: yup.object({
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().required("Password is required")
    }),
    google: yup.object({
        idToken: yup.string().required()
    })
}