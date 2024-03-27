import {UserToClient} from './types/index';
import {User} from '../types/types';
import {UserType} from '../const';

export const adapterUserToClient = (user: UserToClient): User => {
  type ChangeUser = Omit<UserToClient & User, 'isPro' | 'token'> & {isPro?: UserType; token?: string};

  const changeUser: ChangeUser = {
    ...user,
    type: user.isPro
  };

  delete changeUser.isPro;
  delete changeUser.token;

  return changeUser;
};
