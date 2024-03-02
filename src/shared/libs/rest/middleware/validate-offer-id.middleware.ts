import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';

export class ValidateOfferIdMiddleware implements Middleware {
  constructor(private param: string) {}

  public async execute({ params }: Request, _res: Response, next: NextFunction): Promise<void> {
    const objectId = params[this.param];

    if(Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.NOT_FOUND,
      `Offer for identifier ${objectId} does not exist.`,
      'ValidateOfferIdMiddleware'
    );
  }
}
