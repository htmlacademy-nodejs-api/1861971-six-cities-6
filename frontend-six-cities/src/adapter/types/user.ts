import {UserType} from '../../const';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  isPro: UserType;
}
