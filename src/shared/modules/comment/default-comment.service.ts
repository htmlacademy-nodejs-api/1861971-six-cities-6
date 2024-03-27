import { types, DocumentType } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import {CommentService, CommentEntity} from './index.js';
import { Component } from '../../const/index.js';
import { Logger } from '../../libs/logger/index.js';
import {CreateComment, SettingParameterComment} from '../../types/index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dataComment: CreateComment): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dataComment);
    this.logger.info('New comment created');

    return comment
      .populate(['authorComment']);
  }

  public async getCommentsList({offerId, counterComment}: SettingParameterComment): Promise<DocumentType<CommentEntity>[] | null> {
    const commentsList = await this.commentModel
      .find({offerId})
      .limit(counterComment)
      .sort({data: -1})
      .populate(['authorComment'])
      .exec();

    return commentsList;
  }
}
