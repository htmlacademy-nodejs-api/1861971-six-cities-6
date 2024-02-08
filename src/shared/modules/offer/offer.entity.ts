import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import {NameCity, HousingTypes, ComfortList} from '../../const/index.js';
import {Location} from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({required: true, minlength: 10, maxlength: 100})
  public title!: string;

  @prop({required: true, minlength: 20, maxlength: 1024})
  public description!: string;

  @prop({required: true})
  public data!: string;

  @prop({required: true, enum: NameCity})
  public nameCity!: string;

  @prop({required: true})
  public previevImage!: string;

  @prop({
    required: true,
    type: () => [[[[[[String]]]]]]
  })
  public images!: string[][][][][][];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public isFavorite!: boolean;

  @prop({required: true, min: 1, max: 5})
  public rating!: number;

  @prop({required: true, enum: HousingTypes})
  public type!: string;

  @prop({required: true, min: 1, max: 8})
  public bedrooms!: number;

  @prop({required: true, min: 1, max: 10})
  public maxAdalts!: number;

  @prop({required: true, min: 100, max: 100000})
  public price!: number;

  @prop({required: true})
  public goods!: ComfortList[];

  @prop({required: true, ref: UserEntity})
  public dataHost!: Ref<UserEntity>;

  @prop({default: 0})
  public numberComments!: number;

  @prop({required: true})
  public coordinates: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
