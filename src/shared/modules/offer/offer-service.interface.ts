import { CreateOfferDto, UpdateOfferDto } from './index.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getOffersList (count: number): Promise<DocumentType<OfferEntity>[] | null>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}

