import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {StatusCodes} from 'http-status-codes';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component, DEFAULT_USER_PASSWORD } from '../../const/index.js';
import { OfferService } from './offer-service.interface.js';
import {UserService} from '../user/index.js';
import { fillDTO } from '../../helpers/index.js';
import {OfferRdo} from './rdo/offer.rdo.js';
import {UpdateOfferRequest, CreateOfferRequest} from '../../types/index.js';
import {HttpError} from '../../libs/rest/errors/index.js';
import {Config, RestSchema} from '../../libs/config/index.js';
import {OfferEntity} from './index.js';

const emailUser = 'Vlad.Vankov@yandex.com';


@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.UserService) private readonly userService: UserService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/:namber', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId/redaction', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:offerId/detail', method: HttpMethod.Get, handler: this.detail });
    this.addRoute({ path: '/:offerId/delete', method: HttpMethod.Delete, handler: this.delete });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const count = req.params.namber;
    const offersList = await this.offerService.getOffersList(Number(count));
    const responseData = fillDTO(OfferRdo, offersList);
    this.ok(res, responseData);
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const {dataHost} = body;

    const checkAuthorization = await this.userService.findByEmail(dataHost.email);

    if(!checkAuthorization) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `User with email ${dataHost.email} unauthorized.`,
        'OfferController'
      );
    }

    const {id} = await this.userService.findOrCreate({
      ...dataHost,
      password: DEFAULT_USER_PASSWORD
    },
    this.configService.get('SALT'));

    body.dataHost = id;

    const offer = await this.offerService.create(body);
    const responseDataOffer = fillDTO(OfferRdo, offer);
    this.created(res, responseDataOffer);
  }

  public async update(
    { params: {offerId}, body }: UpdateOfferRequest,
    res: Response,
  ): Promise<void> {
    const checkAuthorization = await this.userService.findByEmail(emailUser);

    if(!checkAuthorization) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `User with email ${emailUser} unauthorized.`,
        'OfferController / function update'
      );
    }

    const offer = await this.offerService.findById(offerId as string)
      .then((result) => result as OfferEntity)
      .catch(() => {
        throw new HttpError(
          StatusCodes.NOT_FOUND,
          `Offer for identifier ${offerId} does not exist.`,
          'OfferController / function update'
        );
      }
      );


    const {dataHost} = offer;
    const value = JSON.stringify(dataHost._id) === JSON.stringify(checkAuthorization._id);
    if(!value) {
      throw new HttpError(
        StatusCodes.NOT_MODIFIED,
        'Edit offer impossible because creat not by you.',
        'OfferController / function update'
      );
    }

    const updateOffer = await this.offerService.updateById(offerId as string, body);
    const responseData = fillDTO(OfferRdo, updateOffer);
    this.ok(res, responseData);
  }

  public async detail(req: Request, res: Response): Promise<void> {
    const {offerId} = req.params;

    const offer = await this.offerService.findById(offerId)
      .then((result) => result as OfferEntity)
      .catch(() => {
        throw new HttpError(
          StatusCodes.NOT_FOUND,
          `Offer for identifier ${offerId} does not exist.`,
          'OfferController / function detail'
        );
      }
      );

    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const {offerId} = req.params;

    const checkAuthorization = await this.userService.findByEmail(emailUser);

    if(!checkAuthorization) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `User with email ${emailUser} unauthorized.`,
        'OfferController / function delete'
      );
    }

    const offer = await this.offerService.findById(offerId as string)
      .then((result) => result as OfferEntity)
      .catch(() => {
        throw new HttpError(
          StatusCodes.NOT_FOUND,
          `Offer for identifier ${offerId} does not exist.`,
          'OfferController / function delete'
        );
      }
      );


    const {dataHost} = offer;
    const value = JSON.stringify(dataHost._id) === JSON.stringify(checkAuthorization._id);
    if(!value) {
      throw new HttpError(
        StatusCodes.NOT_MODIFIED,
        'Delete offer impossible because creat not by you.',
        'OfferController / function delete'
      );
    }

    await this.offerService.deleteById(offerId as string);
    this.noContent(res, {message: `Offer this identifier ${offerId} to delete.`});
  }

}
