import { Expose } from 'class-transformer';

export class PremiumOfferRdo {
  @Expose()
  public price: number;

  @Expose()
  public title: string;

  @Expose()
  public type: string;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public data: string;

  @Expose()
  public nameCity: string;

  @Expose()
  public previevImage: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public numberComments: number;
}
