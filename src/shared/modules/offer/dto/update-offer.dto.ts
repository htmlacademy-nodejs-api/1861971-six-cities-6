export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public data?: string;
  public nameCity?: string;
  public previevImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rating?: number;
  public type?: string;
  public bedrooms?: number;
  public maxAdalts?: number;
  public price?: number;
  public goods?: string[];
  public coordinates?: {
    latitude?: number;
    longitude?: number;
    };
}
