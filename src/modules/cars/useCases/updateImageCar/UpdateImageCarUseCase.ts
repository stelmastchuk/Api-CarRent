/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
}
@injectable()
class UpdateImageCarUseCase {
    constructor(
        @inject("")
        private carRepository: ICarsRepository,
        @inject("")
        private carImagesRepository: ICarsImagesRepository
    ) { }
    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.carImagesRepository.findByImages(image);

            if (!image) {
                await this.carImagesRepository.create(car_id, image);
            }
        });
    }
}

export { UpdateImageCarUseCase };
