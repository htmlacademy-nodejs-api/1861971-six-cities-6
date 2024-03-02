import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import {UserService} from '../../../modules/user/index.js';

export class ValidateCorrectUserEmailMiddleware implements Middleware {
  constructor(private param: {
    emailUser: string,
    userService: UserService
  }) {}

  public async execute(_req: Request, _res: Response, next: NextFunction): Promise<void> {
    const {emailUser, userService} = this.param;
    const existsUser = await userService.findByEmail(emailUser);

    if (existsUser) {
      return next();
    }

    throw new HttpError(
      StatusCodes.CONFLICT,
      `User with email «${emailUser}» doese not exist.You can not remove this offer.`,
      'ValidateUserEmailMiddleware'
    );
  }
}
