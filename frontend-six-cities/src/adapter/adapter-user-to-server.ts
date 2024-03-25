import {UserRegister} from '../types/types';
import {UserForServer} from './types/user-for-server';

export const adapterUserToServer = (userRegister: UserRegister): UserForServer => {
  type ChangeUser = Omit<UserRegister & UserForServer, 'type'> & { type?: string };

  const changeUser: ChangeUser = {
    ...userRegister,
    isPro: userRegister.type
  };

  delete changeUser.type;

  return changeUser;
};
