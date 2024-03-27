import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../const/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto, UpdateOfferDto } from './index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create({
      ...dto,
      data: new Date().toISOString(),
      rating: 5,
      city: {
        name: dto.nameCity,
        location: dto.coordinates
      }
    });
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['dataHost', 'coordinates'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async getOffersList (count: number): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find()
      .sort({data: -1})
      .limit(count)
      .populate(['dataHost'])
      .exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['dataHost', 'coordinates'])
      .exec();
  }

  public async getPremiumOffersList(count: number, city: string | undefined): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find({isPremium: true, nameCity: city })
      .sort({data: -1})
      .limit(count)
      .exec();
  }

  public async deleteByIdAll(userId: string): Promise<boolean> {
    const offersList = await this.offerModel.find({dataHost: userId});

    if(!offersList) {
      return true;
    }

    offersList.forEach((offer) => {
      this.offerModel
        .findByIdAndDelete(offer.id)
        .exec();
    });

    return true;
  }
}


