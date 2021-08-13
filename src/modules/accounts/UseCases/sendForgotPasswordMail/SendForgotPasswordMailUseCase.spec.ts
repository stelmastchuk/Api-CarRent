import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dayjsprovider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/implementations/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dataProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        mailProvider = new MailProviderInMemory();
        dataProvider = new DayjsDateProvider();
        userRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            userRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dataProvider,
            mailProvider
        );
    });

    it("should be able to send forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await userRepositoryInMemory.create({
            name: "teste",
            password: "teste1234",
            email: "teste@gmail.com",
            driver_license: "B",
        });

        await sendForgotPasswordMailUseCase.execute("teste@gmail.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("testao@gnmail.com")
        ).rejects.toEqual(new AppError("Email does not exists!"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        await userRepositoryInMemory.create({
            name: "teste2",
            password: "teste12345",
            email: "teste2@gmail.com",
            driver_license: "B",
        });

        await sendForgotPasswordMailUseCase.execute("teste2@gmail.com");

        expect(generateTokenMail).toBeCalled();
    });
});
