import { Request } from 'express';
import {
  RequestBody,
  RequestParams
} from './index.js';
import { LoginUserDto } from '../modules/user/index.js';

export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;
