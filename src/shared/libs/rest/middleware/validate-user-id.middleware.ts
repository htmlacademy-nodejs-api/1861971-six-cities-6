import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';

export class ValidateUserIdMiddleware implements Middleware {
  public async execute({ body, tokenPayload: {id}}: Request, _res: Response, next: NextFunction): Promise<void> {

    const userId = id;

    if(Types.ObjectId.isValid(userId)) {
      body.dataHost = userId;
      return next();
    }

    throw new HttpError(
      StatusCodes.FORBIDDEN,
      `User with id: ${userId} unauthorized.`,
      'ValidateUserIdMiddleware'
    );
  }
}
