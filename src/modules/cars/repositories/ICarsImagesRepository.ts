import { ImageCar } from "../infra/typeorm/entities/ImageCar";

interface ICarsImagesRepository {
    create(car_id: string, image_name: string): Promise<ImageCar>;
    findByImages(images_name: string): Promise<string>;
}

export { ICarsImagesRepository };
