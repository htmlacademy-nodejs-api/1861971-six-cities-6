import {
  CommentToClient,
  User
} from './types/index';
import {
  Comment
} from '../types/types';
import {UserType} from '../const';

export const adapterCommentToClient = (comment: CommentToClient): Comment => {
  type ChangeComment = Omit<CommentToClient & Comment,
  'text' | 'data' | 'authorCommen'> &
  {
    text?: string,
    data?: string,
    authorCommen?: User,
  }

  type ChangeUser = Omit<User, 'id' | 'isPro'> &
  {
    id?: string,
    isPro?: UserType,
    type: UserType
  }

  const changeUser: ChangeUser = {
    ...comment.authorComment,
    type: comment.authorComment.isPro
  };

  delete changeUser.id;
  delete changeUser.isPro;

  const changeComment: ChangeComment = {
    ...comment,
    comment: comment.text,
    date: comment.data,
    user: changeUser
  };

  delete changeComment.text;
  delete changeComment.data;
  delete changeComment.authorCommen;

  return changeComment;
};
