import * as yup from "yup"

export const CommentSchema = {
    create: yup.object({
        content: yup.string().max(256, "Content must contain fewer than 256 characters").required("Content is required")
    })
}