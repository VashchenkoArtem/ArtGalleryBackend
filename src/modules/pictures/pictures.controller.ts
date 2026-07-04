import { BadRequestError } from "../../errors/app-errors";
import { UserService } from "../auth/auth.service";
import { PicturesService } from "./pictures.service";
import { IPicturesControllerContact } from "./types/pictures.contracts";

export const PicturesController: IPicturesControllerContact = {
    getPictures: async (req, res, next) => {
        try {
            const limit = Number(req.query.limit)
            const page = Number(req.query.page)
            if (isNaN(limit)|| isNaN(page)){
                throw new BadRequestError("Some args are missing in query")
            }
            const pictures = await PicturesService.getPictures({limit, page})
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
            const userId = res.locals.userId
            const isUserAdmin = await UserService.isUserAdmin(userId)
            const pictureDataWithImage = {
                ...pictureData,
                image: pictureImage.filename
            }
            const createdPicture = await PicturesService.createPicture(pictureDataWithImage, isUserAdmin)
            res.status(201).json(createdPicture)
        } catch (error) {
            next(error)
        }
    }
}