import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import {
  BaseController,
  HttpMethod,
  ValidateUserEmailMiddleware,
  ValidateDtoMiddleware,
  ValidateUserIdMiddleware,
  UploadFileMiddleware
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../const/index.js';
import { CreateUserRequest } from '../../types/index.js';
import {
  UserService,
  UserRdo,
  CreateUserDto
} from './index.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { fillDTO } from '../../helpers/index.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute(
      {
        path: '/register',
        method: HttpMethod.Post,
        handler: this.create,
        middlewares: [
          new ValidateUserEmailMiddleware(userService),
          new ValidateDtoMiddleware(CreateUserDto)
        ]
      }
    );
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateUserIdMiddleware,
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {

    const user = await this.userService.create(
      body,
      this.configService.get('SALT')
    );
    const responseDataUser = fillDTO(UserRdo, user);
    this.created(res, responseDataUser);
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }

}
