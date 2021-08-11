import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarUseCase } from "./ListAvailableCarUseCase";

let listAvailableCarUseCase: ListAvailableCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarUseCase = new ListAvailableCarUseCase(
            carsRepositoryInMemory
        );
    });

    it("should be able a list all avaiable cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "CarDescription",
            daily_rate: 111,
            license_plate: "xxx-222",
            fine_amount: 222,
            brand: "Volksvagem22",
            category_id: "category_id",
        });

        const cars = await listAvailableCarUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all avaible cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "CarDescription",
            daily_rate: 111,
            license_plate: "xxx-555",
            fine_amount: 222,
            brand: "Volksvagem",
            category_id: "category_id",
        });

        const cars = await listAvailableCarUseCase.execute({
            brand: "Volksvagem",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all avaible cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "CarDescription",
            daily_rate: 111,
            license_plate: "xxx-444",
            fine_amount: 222,
            brand: "Volksvagem",
            category_id: "category_id",
        });

        const cars = await listAvailableCarUseCase.execute({
            name: "Car3",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all avaible cars by category_id", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car4",
            description: "CarDescription",
            daily_rate: 111,
            license_plate: "xxx-333",
            fine_amount: 222,
            brand: "Volksvagem",
            category_id: "category_id",
        });

        const cars = await listAvailableCarUseCase.execute({
            category_id: "category_id",
        });

        expect(cars).toEqual([car]);
    });
});
