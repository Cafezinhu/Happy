import { getRepository } from 'typeorm';
import Orphanage from '../models/orphanage';
import { Request, Response } from 'express';
import orphanagesView from '../views/orphanages_view';
import * as Yup from 'yup';

export default {
    async index(req: Request, res: Response)
    {
        const repository = getRepository(Orphanage);
        const orphanages = await repository.find({relations: ['images']});
        res.status(200).json(orphanagesView.renderMany(orphanages));
    },
    async show(req: Request, res: Response)
    {
        const { id } = req.params;
        const repository = getRepository(Orphanage);
        const orphanage = await repository.findOneOrFail(id, {relations: ['images']});
        res.status(200).json(orphanagesView.render(orphanage));
    },

    async create(req: Request, res: Response)
    {
        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return {path: image.filename};
        });
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;
        const repository = getRepository(Orphanage);

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const orphanage = repository.create(data);
        await repository.save(orphanage);
        res.status(203).json(orphanage);
    }
}