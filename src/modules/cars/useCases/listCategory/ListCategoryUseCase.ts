/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";



@injectable()
class ListCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoriesRepository: ICategoryRepository
    ) { }

    async execute(): Promise<Category[]> {
        const category = await this.categoriesRepository.list();

        return category;
    }
}

export { ListCategoryUseCase };