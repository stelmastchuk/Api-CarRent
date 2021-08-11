/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayLoad {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "769a5c867380cf637a3d0c13d8cc445c"
        ) as IPayLoad;

        const usersRepository = new UserRepository();

        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists", 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
