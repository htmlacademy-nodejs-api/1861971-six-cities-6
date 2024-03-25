import { UserService } from './user-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import {
  CreateUserDto,
  UpdateUserDto
} from './index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../const/index.js';
import { Logger } from '../../libs/logger/index.js';
import {FavoriteService} from '../favorite/index.js';
import {OfferService} from '../offer/index.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
    @inject(Component.OfferService) protected readonly offerService: OfferService,
    @inject(Component.FavoriteService) protected readonly favoriteService: FavoriteService,
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findOne({email})
      .exec();
  }

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id);
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, { new: true })
      .exec();
  }

  public async deleteUser(usreId: string, email: string): Promise<DocumentType<UserEntity> | null> {
    const deleteFavoritesList = await this.favoriteService.deleteByIdAll(email);
    const deleteOffersList = await this.offerService.deleteByIdAll(usreId);

    if(!deleteFavoritesList || !deleteOffersList) {
      return null;
    }

    return this.userModel
      .findByIdAndDelete(usreId)
      .exec();
  }

}
