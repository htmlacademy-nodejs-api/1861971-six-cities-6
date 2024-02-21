import { Request } from 'express';
import { RequestBody, RequestParams } from './index.js';
import {CreateUserDto} from '../modules/user/index.js';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
