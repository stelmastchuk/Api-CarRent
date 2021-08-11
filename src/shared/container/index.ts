import { container } from "tsyringe";

import "@shared/container/providers";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarImagesRepository";
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoryRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { RentalRepository } from "@modules/rentals/infra/typeorm/repositories/RentalRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

// ICategoryRepository
container.registerSingleton<ICategoryRepository>(
    "CategoryRepository",
    CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UserRepository
);

container.registerSingleton<ICarsRepository>("CarRepository", CarRepository);

container.registerSingleton<ICarsImagesRepository>(
    "CarImagesRepository",
    CarImagesRepository
);

container.registerSingleton<IRentalsRepository>(
    "RentalRepository",
    RentalRepository
);
