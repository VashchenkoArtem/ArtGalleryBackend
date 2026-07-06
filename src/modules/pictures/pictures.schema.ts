import * as yup from "yup"

export const PictureSchema = {
    create: yup.object({
        title: yup.string().max(35, "Title must contain fewer than 35 characters").required("Title is required"),
        collectionId: yup.number().required("Collection is required"),
        orientation: yup.string().max(15).required("Orientation is required")
    })
}