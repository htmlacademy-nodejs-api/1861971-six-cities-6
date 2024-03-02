import { DocumentType } from '@typegoose/typegoose';
import {FavoriteEntity, CreateFavoriteDto} from './index.js';

export interface FavoriteService {
  findByEmail(email: string): Promise<string[] | null>;
  create(dto: CreateFavoriteDto): Promise<DocumentType<FavoriteEntity> | string>;
  deleteById(offerId: string, email: string): Promise<DocumentType<FavoriteEntity> | null>
}
