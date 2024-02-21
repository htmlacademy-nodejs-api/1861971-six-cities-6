import { Request } from 'express';
import { RequestBody, RequestParams } from './index.js';
import { CreateOfferDto } from '../modules/offer/index.js';

export type CreateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;
