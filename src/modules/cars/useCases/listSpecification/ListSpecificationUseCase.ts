/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";



@injectable()
class ListSpecificationUseCase {
    constructor(
        @inject(SpecificationRepository)
        private specificationsRepository: ISpecificationRepository
    ) { }

    async execute(): Promise<Specification[]> {
        const spec = await this.specificationsRepository.list();
        return spec;
    }
}

export { ListSpecificationUseCase };
