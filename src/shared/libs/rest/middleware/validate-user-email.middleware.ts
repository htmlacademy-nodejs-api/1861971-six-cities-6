import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import {CreateUserRequest} from '../../../types/index.js';
import {UserService} from '../../../modules/user/index.js';

export class ValidateUserEmailMiddleware implements Middleware {
  constructor(private param: UserService) {}

  public async execute({ body }: CreateUserRequest, _res: Response, next: NextFunction): Promise<void> {
    const existsUser = await this.param.findByEmail(body.email);

    if (!existsUser) {
      return next();
    }

    throw new HttpError(
      StatusCodes.CONFLICT,
      `User with email «${body.email}» exists.`,
      'ValidateUserEmailMiddleware'
    );
  }
}
