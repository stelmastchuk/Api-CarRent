import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-Memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dayjsprovider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        dateProvider = new DayjsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dateProvider,
            carsRepositoryInMemory
        );
    });

    it("should be able to create a new Rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "carroteste",
            description: "teste",
            daily_rate: 200,
            license_plate: "TESTE",
            fine_amount: 140,
            brand: "aaa",
            category_id: "ads1233",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "121212",
            expected_return_date: dayAdd24hours,
            user_id: "12345",
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "3333",
                expected_return_date: dayAdd24hours,
            })
        ).rejects.toEqual(
            new AppError("There's a rental in progress for user!")
        );
    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "carroteste",
            description: "teste",
            daily_rate: 200,
            license_plate: "TESTE",
            fine_amount: 140,
            brand: "aaa",
            category_id: "ads1233",
        });

        await createRentalUseCase.execute({
            user_id: "2222",
            car_id: car.id,
            expected_return_date: dayAdd24hours,
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "3333",
                car_id: car.id,
                expected_return_date: dayAdd24hours,
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("should not be able to create a new rental with invalid return time ", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "4444",
                car_id: "332323",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Invalid return time!"));
    });
});
