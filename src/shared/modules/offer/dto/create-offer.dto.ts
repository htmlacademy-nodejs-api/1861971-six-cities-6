import {User, Location} from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public data: string;
  public nameCity: string;
  public previevImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: string;
  public bedrooms: number;
  public maxAdalts: number;
  public price: number;
  public goods: string[];
  public dataHost: User;
  public numberComments: number;
  public coordinates: Location;
}
