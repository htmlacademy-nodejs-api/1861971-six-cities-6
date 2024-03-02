import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {StatusCodes} from 'http-status-codes';
import {
  BaseController,
  HttpMethod,
  ValidateCorrectUserEmailMiddleware,
  ValidateOfferIdMiddleware,
  ValidateOfferMiddleware,
  ValidateEditingMiddleware,
  ValidateUserIdMiddleware,
  ValidateDtoMiddleware
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component} from '../../const/index.js';
import { OfferService } from './offer-service.interface.js';
import {UserService} from '../user/index.js';
import {LocationService} from '../location/index.js';
import { fillDTO } from '../../helpers/index.js';
import {
  OfferRdo,
  PremiumOfferRdo,
  CreateOfferDto,
  UpdateOfferDto
} from './index.js';
import {UpdateOfferRequest, CreateOfferRequest} from '../../types/index.js';
import {HttpError} from '../../libs/rest/errors/index.js';

const emailUser = 'Nadya.conner@gmail.com';


@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.LocationService) private readonly locationService: LocationService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/:namber', method: HttpMethod.Get, handler: this.index });

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateUserIdMiddleware,
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });

    this.addRoute({
      path: '/:offerId/redaction',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateCorrectUserEmailMiddleware({
          emailUser,
          userService
        }),
        new ValidateOfferIdMiddleware('offerId'),
        new ValidateOfferMiddleware({
          offerId: 'offerId',
          offerService
        }),
        new ValidateEditingMiddleware({
          offerId: 'offerId',
          offerService,
          emailUser,
          userService
        }),
        new ValidateDtoMiddleware(UpdateOfferDto)
      ]
    });

    this.addRoute({
      path: '/:offerId/detail',
      method: HttpMethod.Get,
      handler: this.detail,
      middlewares: [
        new ValidateOfferIdMiddleware('offerId'),
        new ValidateOfferMiddleware({
          offerId: 'offerId',
          offerService
        })
      ]
    });

    this.addRoute({
      path: '/:offerId/delete',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateCorrectUserEmailMiddleware({
          emailUser,
          userService
        }),
        new ValidateOfferIdMiddleware('offerId'),
        new ValidateOfferMiddleware({
          offerId: 'offerId',
          offerService
        }),
        new ValidateEditingMiddleware({
          offerId: 'offerId',
          offerService,
          emailUser,
          userService
        })
      ]
    });
    this.addRoute({path: '/premium/:namber', method: HttpMethod.Get, handler: this.indexPremium});
  }

  public async index(req: Request, res: Response): Promise<void> {
    const {namber} = req.params;
    const offersList = await this.offerService.getOffersList(Number(namber));
    const responseData = fillDTO(OfferRdo, offersList);
    this.ok(res, responseData);
  }


  public async create(
    { body }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const {dataHost, nameCity} = body;

    const checkAuthorization = await this.userService.findById(dataHost);

    if(!checkAuthorization) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `User with id: ${dataHost} unauthorized.`,
        'OfferController'
      );
    }

    const idLocation = await this.locationService.findOrCreate(nameCity);

    const newOffer = await this.offerService.create(body, idLocation);
    const offer = await this.offerService.findById(newOffer.id);
    const responseDataOffer = fillDTO(OfferRdo, offer);
    this.created(res, responseDataOffer);
  }


  public async update(
    { params: {offerId}, body }: UpdateOfferRequest,
    res: Response,
  ): Promise<void> {

    const offer = await this.offerService.findById(offerId as string);

    if(!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer for identifier ${offerId} does not exist.`,
        'OfferController / function update'
      );
    }

    const value = offer.nameCity === body.nameCity;

    if(!value && body.nameCity) {
      const idLocation = await this.locationService.findOrCreate(body.nameCity);
      body.coordinates = idLocation;
    }

    const updateOffer = await this.offerService.updateById(offerId as string, body);
    const responseData = fillDTO(OfferRdo, updateOffer);
    this.ok(res, responseData);
  }


  public async detail(req: Request, res: Response): Promise<void> {
    const {offerId} = req.params;

    const offer = await this.offerService.findById(offerId);
    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }


  public async delete({params}: Request, res: Response): Promise<void> {
    const {offerId} = params;

    await this.offerService.deleteById(offerId as string);
    this.noContent(res, JSON.stringify({message: `Offer this identifier ${offerId} to delete.`}));
  }

  public async indexPremium({params: {namber}}: Request, res: Response): Promise<void> {

    const premiumOfferList = await this.offerService.getPremiumOffersList(Number(namber));
    const responseData = fillDTO(PremiumOfferRdo, premiumOfferList);
    this.ok(res, responseData);
  }

}
