import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import {UserService} from '../../../modules/user/index.js';

export class ValidateCorrectUserEmailMiddleware implements Middleware {
  constructor(private param: {
    userService: UserService
  }) {}

  public async execute({tokenPayload: {email}}: Request, _res: Response, next: NextFunction): Promise<void> {
    const {userService} = this.param;
    const existsUser = await userService.findByEmail(email);

    if (existsUser) {
      return next();
    }

    throw new HttpError(
      StatusCodes.CONFLICT,
      `User with email «${email}» doese not exist.You can not remove this offer.`,
      'ValidateCorrectUserEmailMiddleware'
    );
  }
}
