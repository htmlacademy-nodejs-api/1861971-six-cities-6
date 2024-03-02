import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../const/index.js';
import {
  LocationEntity,
  LocationModel,
  LocationService,
  DefaultLocationService
} from './index.js';

export function createLocationContainer() {
  const locationContainer = new Container();
  locationContainer.bind<LocationService>(Component.LocationService).to(DefaultLocationService).inSingletonScope();
  locationContainer.bind<types.ModelType<LocationEntity>>(Component.LocationModel).toConstantValue(LocationModel);

  return locationContainer;
}
