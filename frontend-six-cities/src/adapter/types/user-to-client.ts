import {UserType} from '../../const';

export type UserToClient = {
  name: string,
  email: string,
  avatarUrl: string,
  isPro: UserType,
  token: string,
}
