import { types, DocumentType } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import {
  FavoriteService,
  FavoriteEntity,
  CreateFavoriteDto
} from './index.js';
import { Component } from '../../const/index.js';
import { Logger } from '../../libs/logger/index.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>
  ) {}

  public async findByEmail(email: string): Promise<string[] | null> {

    const favoriteOfferList = await this.favoriteModel.find({email: email});

    if(favoriteOfferList.length === 0) {
      return null;
    }

    const favoriteOfferIdList = favoriteOfferList.map(({offer}: FavoriteEntity) => offer);
    return favoriteOfferIdList;
  }

  public async create(dto: CreateFavoriteDto): Promise<DocumentType<FavoriteEntity> | string> {
    const idOffer = await this.favoriteModel.findOne({offer: dto.offer, email: dto.email});

    if(idOffer) {
      return idOffer.id;
    }

    const result = await this.favoriteModel.create(dto);
    this.logger.info(`New favorit offer created: ${dto.offer}`);

    return result;
  }

  public async deleteById(offerId: string, email: string): Promise<DocumentType<FavoriteEntity> | null> {
    const favoriteOffer = await this.favoriteModel.findOne({offer: offerId, email: email});

    if(!favoriteOffer) {
      return favoriteOffer;
    }

    return this.favoriteModel
      .findByIdAndDelete(favoriteOffer.id)
      .exec();
  }

}
