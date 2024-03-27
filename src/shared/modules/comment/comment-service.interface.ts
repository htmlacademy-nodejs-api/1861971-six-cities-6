import {CreateComment, SettingParameterComment} from '../../types/index.js';
import { DocumentType } from '@typegoose/typegoose';
import {CommentEntity} from './index.js';

export interface CommentService {
  create(dataComment: CreateComment): Promise<DocumentType<CommentEntity>>;
  getCommentsList (settingParameter: SettingParameterComment): Promise<DocumentType<CommentEntity>[] | null>;
}
