import { Expose, Type } from 'class-transformer';
import {UserRdo} from '../../user/index.js';
import {LocationRdo} from '../../location/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public data: string;

  @Expose()
  public nameCity: string;

  @Expose()
  public previevImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: string;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdalts: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: string[];

  @Expose()
  @Type(() => UserRdo)
  public dataHost: Set<UserRdo>;

  @Expose()
  public numberComments: number;

  @Expose()
  @Type(() => LocationRdo)
  public coordinates: Set<LocationRdo>;
}
