import { Request } from 'express';
import { RequestBody, RequestParams } from './index.js';
import { CreateCommentDto } from '../modules/comment/index.js';

export type CreateCommentRequest = Request<RequestParams, RequestBody, CreateCommentDto>;
