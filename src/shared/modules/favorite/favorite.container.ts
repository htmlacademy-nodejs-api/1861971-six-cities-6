import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import {
  FavoriteEntity,
  FavoriteModel,
  FavoriteService,
  DefaultFavoriteService,
  FavoriteController
} from './index.js';
import { Component } from '../../const/index.js';
import {Controller} from '../../libs/rest/index.js';

export function createFavoriteContainer() {
  const favoriteContainer = new Container();
  favoriteContainer.bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel).toConstantValue(FavoriteModel);
  favoriteContainer.bind<FavoriteService>(Component.FavoriteService).to(DefaultFavoriteService).inSingletonScope();
  favoriteContainer.bind<Controller>(Component.FavoriteController).to(FavoriteController).inSingletonScope();

  return favoriteContainer;
}
