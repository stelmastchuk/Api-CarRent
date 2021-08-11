import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalRepository implements IRentalsRepository {
    private repostitory: Repository<Rental>;

    constructor() {
        this.repostitory = getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repostitory.findOne({
            where: { car_id, end_date: null },
        });

        return openByCar;
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repostitory.findOne({
            where: { user_id, end_date: null },
        });

        return openByUser;
    }
    async create({
        car_id,
        expected_return_date,
        user_id,
        id,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repostitory.create({
            user_id,
            car_id,
            expected_return_date,
            id,
            end_date,
            total,
        });

        await this.repostitory.save(rental);

        return rental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repostitory.findOne(id);
        return rental;
    }

    async findByUserId(user_id: string): Promise<Rental[]> {
        const rental = await this.repostitory.find({
            where: { user_id },
            relations: ["car"],
        });
        return rental;
    }
}

export { RentalRepository };
