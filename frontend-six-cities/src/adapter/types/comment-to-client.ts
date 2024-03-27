import {User} from './user';

export type CommentToClient = {
  id: string;
  text: string;
  data: string;
  rating: number;
  authorComment: User;
}
