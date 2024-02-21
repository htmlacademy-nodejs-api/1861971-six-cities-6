import { Request } from 'express';
import { RequestBody, RequestParams } from './index.js';
import { UpdateOfferDto } from '../modules/offer/index.js';

export type UpdateOfferRequest = Request<RequestParams, RequestBody, UpdateOfferDto>;
