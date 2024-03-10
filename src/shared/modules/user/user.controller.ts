import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import {StatusCodes} from 'http-status-codes';
import {
  BaseController,
  HttpMethod,
  ValidateUserEmailMiddleware,
  ValidateDtoMiddleware,
  ValidateUserIdMiddleware,
  UploadFileMiddleware,
  PrivateRouteMiddleware,
} from '../../libs/rest/index.js';
import {HttpError} from '../../libs/rest/errors/index.js';
import {AuthService} from '../auth/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../const/index.js';
import { CreateUserRequest } from '../../types/index.js';
import {
  UserService,
  UserRdo,
  CreateUserDto,
  LoggedUserRdo,
  LoginUserDto
} from './index.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { fillDTO } from '../../helpers/index.js';
import {LoginUserRequest} from '../../types/index.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService
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
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });

    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateUserIdMiddleware(),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });

    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
      middlewares: [new PrivateRouteMiddleware()]
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

  public async login(
    { body }: LoginUserRequest,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, {
      email: user.email,
      token,
    });
    this.ok(res, responseData);
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }

  public async checkAuthenticate({ tokenPayload: { email }}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (! foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    const responseDataUser = fillDTO(LoggedUserRdo, foundedUser);
    this.ok(res, responseDataUser);
  }
}
