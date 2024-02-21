import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import {imageFormats, UserType} from '../../const/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true, minlength: 1, maxlength: 15})
  public name: string;

  @prop({required: true, unique: true, match: /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/})
  public email: string;

  @prop({
    default: 'img/10.png',
    validate: {
      validator: (imegeAvatar: string): string | void => {
        const values = imegeAvatar.split('.');

        if(imageFormats.find((imageFormat) => imageFormat === values[values.length - 1])){
          return imegeAvatar;
        }
      },
      message: 'The user is image in the format can be "jpg" or "png"!'
    }
  })
  public avatarUrl?: string;

  @prop({required: true, enum: UserType})
  public isPro: string;

  @prop({required: true})
  private password?: string;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.isPro = userData.isPro;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
