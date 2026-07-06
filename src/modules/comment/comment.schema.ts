import * as yup from "yup"

export const CommentSchema = {
    create: yup.object({
        content: yup.string().max(256).required()
    })
}