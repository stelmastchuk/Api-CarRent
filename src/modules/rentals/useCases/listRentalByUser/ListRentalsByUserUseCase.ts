import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalRepository")
        private readonly rentalsRepository: IRentalsRepository
    ) {}

    async execute(user_id: string): Promise<Rental[]> {
        const rentals = await this.rentalsRepository.findByUserId(user_id);

        console.log(rentals);

        if (!rentals.length) {
            throw new AppError("No rentals in system!");
        }

        return rentals;
    }
}

export { ListRentalsByUserUseCase };
