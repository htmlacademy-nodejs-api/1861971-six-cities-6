import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';

export class ValidateUserIdMiddleware implements Middleware {
  public async execute({ body: {dataHost} }: Request, _res: Response, next: NextFunction): Promise<void> {

    if(Types.ObjectId.isValid(dataHost)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.FORBIDDEN,
      `User with id: ${dataHost} unauthorized.`,
      'ValidateUserIdMiddleware'
    );
  }
}
