import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const usertoken = this.repository.create({
            user_id,
            expires_date,
            refresh_token,
        });

        await this.repository.save(usertoken);

        return usertoken;
    }
}

export { UsersTokensRepository };