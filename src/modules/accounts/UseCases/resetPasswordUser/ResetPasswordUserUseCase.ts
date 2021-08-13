import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/dayjsprovider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private userTokenRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findbyRefreshToken(
            token
        );

        if (!userToken) {
            throw new AppError("UserToken not exists!");
        }

        if (
            this.dayjsDateProvider.compareIfBefore(
                userToken.expires_date,
                this.dayjsDateProvider.dateNow()
            )
        ) {
            throw new AppError("Token expired!");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.userTokenRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase };
