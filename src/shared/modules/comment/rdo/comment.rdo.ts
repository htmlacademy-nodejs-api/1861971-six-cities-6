import { Expose, Type } from 'class-transformer';
import {UserRdo} from '../../user/index.js';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public text: string;

  @Expose()
  public data: string;

  @Expose()
  public rating: number;

  @Expose()
  @Type(() => UserRdo)
  public authorComment: Set<UserRdo>;
}
