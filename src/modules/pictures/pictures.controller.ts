import { BadRequestError } from "../../errors";
import { UserService } from "../auth/auth.service";
import { PicturesService } from "./pictures.service";
import { IPicturesControllerContact } from "./types/pictures.contracts";

export const PicturesController: IPicturesControllerContact = {
    getPictures: async (req, res, next) => {
        try {
            const limit = req.query.limit ?? 15
            const page = req.query.page ?? 1
            const pictures = await PicturesService.getPictures({
                limit: Number(limit), 
                page: Number(page)
            })
            res.status(200).json(pictures)
        } catch (error) {
            next(error)
        }
    },
    createPicture: async (req, res, next) => {
        try {
            const pictureData = req.body
            const pictureImage = req.file as Express.Multer.File
            
            if (!pictureData || !pictureImage){
                throw new BadRequestError("Picture data is missing")
            }
            const pictureDataWithImage = {
                ...pictureData,
                image: pictureImage.filename
            }
            const createdPicture = await PicturesService.createPicture(pictureDataWithImage)
            res.status(201).json(createdPicture)
        } catch (error) {
            next(error)
        }
    },
    getPictureByIdWithComments: async (req, res, next) => {
        try {
            const pictureId = Number(req.params.pictureId)
            if (isNaN(pictureId)){
                throw new BadRequestError("Picture id is missing")
            }
            const pictureWithComments = await PicturesService.getPictureByIdWithComments(pictureId)
            res.status(200).json(pictureWithComments)
        } catch (error) {
            next(error)
        }
    }
}