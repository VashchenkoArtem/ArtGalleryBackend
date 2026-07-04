import * as yup from "yup"

export const PictureSchema = {
    create: yup.object({
        title: yup.string().max(35).required(),
        image: yup.string().max(256).required(),
        collectionId: yup.number().required()
    })
}