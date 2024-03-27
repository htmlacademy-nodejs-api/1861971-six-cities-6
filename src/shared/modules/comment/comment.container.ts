import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../const/index.js';
import {
  CommentService,
  CommentEntity,
  DefaultCommentService,
  CommentModel
} from './index.js';

export function createCommentContainer() {
  const commentContainer = new Container();
  commentContainer.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return commentContainer;
}
