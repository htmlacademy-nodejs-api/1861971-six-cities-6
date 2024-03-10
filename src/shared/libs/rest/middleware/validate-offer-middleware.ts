import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import {OfferService} from '../../../modules/offer/index.js';

export class ValidateOfferMiddleware implements Middleware {
  constructor(private param: {
    offerId: string,
    offerService: OfferService
  }) {}

  public async execute({ params }: Request, _res: Response, next: NextFunction): Promise<void> {
    const {offerId, offerService} = this.param;
    const objectId = params[offerId];


    const offer = await offerService.findById(objectId);
    if(offer) {
      return next();
    }

    throw new HttpError(
      StatusCodes.NOT_FOUND,
      `Offer for identifier ${objectId} does not exist.`,
      'ValidateOfferMiddleware'
    );
  }
}
