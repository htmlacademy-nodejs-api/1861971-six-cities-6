import { Expose } from 'class-transformer';

export class FavoriteRdo {
  @Expose()
  public offer: string;

  @Expose()
  public email: string;
}
