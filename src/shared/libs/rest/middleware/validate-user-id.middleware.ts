import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';

export class ValidateUserIdMiddleware implements Middleware {
  public async execute({ body: {dataHost}, params: {userId} }: Request, _res: Response, next: NextFunction): Promise<void> {

    const id = dataHost ?? userId;

    if(Types.ObjectId.isValid(id)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.FORBIDDEN,
      `User with id: ${id} unauthorized.`,
      'ValidateUserIdMiddleware'
    );
  }
}
