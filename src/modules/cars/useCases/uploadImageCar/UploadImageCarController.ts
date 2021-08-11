import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadImageCarUseCase } from "./UploadImageCarUseCase";

interface IFiles {
    filename: string;
}

class UploadImageCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const images = request.files as IFiles[];

        console.log(images);

        const uploadImageCarUseCase = container.resolve(UploadImageCarUseCase);

        const images_name = images.map((file) => file.filename);

        console.log(images_name);

        await uploadImageCarUseCase.execute({
            car_id: id,
            images_name,
        });

        return response.status(201).send();
    }
}

export { UploadImageCarController };
