import { getRepository, Repository } from "typeorm";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

import { ImageCar } from "../entities/ImageCar";

class CarImagesRepository implements ICarsImagesRepository {
    private repository: Repository<ImageCar>;

    constructor() {
        this.repository = getRepository(ImageCar);
    }

    async create(car_id: string, image_name: string): Promise<ImageCar> {
        const carImage = this.repository.create({ car_id, image_name });

        await this.repository.save(carImage);

        return carImage;
    }

    async findByImages(images_name: string): Promise<string> {
        const image = await this.repository.findOne(images_name);

        return image.image_name;
    }
}

export { CarImagesRepository };
