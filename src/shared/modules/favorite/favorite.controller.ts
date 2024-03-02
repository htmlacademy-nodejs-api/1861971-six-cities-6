import { inject, injectable } from 'inversify';
import { DocumentType } from '@typegoose/typegoose';
import { Response, Request } from 'express';
import {
  BaseController,
  HttpMethod,
  ValidateCorrectUserEmailMiddleware,
  ValidateOfferIdMiddleware,
  ValidateOfferMiddleware
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import {FavoriteService, FavoriteRdo} from './index.js';
import {UserService} from '../user/index.js';
import {OfferService, PremiumOfferRdo, OfferEntity} from '../offer/index.js';
import { Component } from '../../const/index.js';
import {fillDTO} from '../../helpers/index.js';

const emailUser = 'Nadya.conner@gmail.com';

@injectable()
export class FavoriteController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.FavoriteService) protected readonly favoriteService: FavoriteService,
    @inject(Component.UserService) protected readonly userService: UserService,
    @inject(Component.OfferService) protected readonly offerService: OfferService
  ) {
    super(logger);
    this.logger.info('Register routes for FavoriteController…');

    this.addRoute(
      {
        path: '/list',
        method: HttpMethod.Get,
        handler: this.index,
        middlewares: [new ValidateCorrectUserEmailMiddleware({emailUser, userService})]
      }
    );

    this.addRoute(
      {
        path: '/:offerId/register/',
        method: HttpMethod.Post,
        handler: this.register,
        middlewares: [
          new ValidateCorrectUserEmailMiddleware({emailUser, userService}),
          new ValidateOfferIdMiddleware('offerId'),
          new ValidateOfferMiddleware({offerId: 'offerId', offerService})
        ]
      }
    );

    this.addRoute(
      {
        path: '/:offerId/delete/',
        method: HttpMethod.Delete,
        handler: this.delete,
        middlewares: [
          new ValidateCorrectUserEmailMiddleware({emailUser, userService}),
          new ValidateOfferIdMiddleware('offerId'),
          new ValidateOfferMiddleware({offerId: 'offerId', offerService})
        ]
      }
    );
  }

  public async index(_req: Request, res: Response,): Promise<void> {
    const favoriteOfferList: DocumentType<OfferEntity>[] = [];

    const favoriteOfferIdList = await this.favoriteService.findByEmail(emailUser);

    if(!favoriteOfferIdList) {
      this.ok(res, {message: 'The list is clear.'});
      return;
    }

    favoriteOfferIdList.forEach(async (index) => {
      const favoriteOffer = await this.offerService.findById(index) as DocumentType<OfferEntity>;
      favoriteOfferList.push(favoriteOffer);
    });

    const responseData = fillDTO(PremiumOfferRdo, favoriteOfferList);
    this.ok(res, responseData);
  }

  public async register({params: {offerId}}: Request, res: Response,): Promise<void> {
    const favoriteOffer = await this.favoriteService.create({offer: offerId, emailUser});

    if(typeof favoriteOffer === 'string'){
      this.ok(res, {message: `Offer with the identifier ${offerId} exists`});
      return;
    }

    await this.offerService.updateById(offerId, {isFavorite: true});

    const responseData = fillDTO(FavoriteRdo, favoriteOffer);
    this.created(res, responseData);
  }

  public async delete({params: {offerId}}: Request, res: Response,): Promise<void> {
    const favoriteOffer = await this.favoriteService.deleteById(offerId, emailUser);

    if(!favoriteOffer) {
      this.ok(res, {message: `Offer with the identifier ${offerId} can't be deleted because it's not in favorites.`});
      return;
    }

    await this.offerService.updateById(offerId, {isFavorite: false});

    this.noContent(res, {message: `Offer this identifier ${offerId} to delete.`});
  }

}
