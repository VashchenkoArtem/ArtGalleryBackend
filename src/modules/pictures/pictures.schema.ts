import * as yup from "yup"

export const PictureSchema = {
    create: yup.object({
        title: yup.string().max(35).required(),
        collectionId: yup.number().required(),
        orientation: yup.string().max(15).required()
    })
}