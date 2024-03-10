import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import {OfferService, OfferEntity} from '../../../modules/offer/index.js';

export class ValidateEditingMiddleware implements Middleware {
  constructor(private param: {
      offerId: string,
      offerService: OfferService,
    }) {}

  public async execute({params, tokenPayload: {id}}: Request, _res: Response, next: NextFunction): Promise<void> {
    const objectId = params[this.param.offerId];

    const {dataHost: {_id}} = await this.param.offerService.findById(objectId) as OfferEntity;

    const value = JSON.stringify(_id) === JSON.stringify(id);
    if(value) {
      return next();
    }

    throw new HttpError(
      StatusCodes.NOT_MODIFIED,
      'Edit offer impossible because creat not by you.',
      'ValidateEditingMiddleware'
    );
  }
}
