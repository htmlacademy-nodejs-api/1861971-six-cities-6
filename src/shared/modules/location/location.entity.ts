import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import {NameCity} from '../../const/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface LocationEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'locations',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class LocationEntity extends defaultClasses.TimeStamps {
  @prop({required: true, enum: NameCity})
  public name!: string;

  @prop({required: true})
  public latitude!: number;

  @prop({required: true})
  public longitude!: number;
}

export const LocationModel = getModelForClass(LocationEntity);
