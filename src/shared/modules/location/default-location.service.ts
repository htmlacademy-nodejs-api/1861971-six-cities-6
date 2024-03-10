import { types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LocationService, LocationEntity } from './index.js';
import { Component } from '../../const/index.js';
import { Logger } from '../../libs/logger/index.js';
import {locationList} from '../../const/index.js';

@injectable()
export class DefaultLocationService implements LocationService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.LocationModel) private readonly locationModel: types.ModelType<LocationEntity>
  ) {}

  public async create(nameCity: string): Promise<string> {
    const objectLocation = locationList.find((element) => element.name === nameCity);

    if(!objectLocation) {
      throw new Error(`Add an object with name: ${nameCity} on the way: ../../const/index.js`);
    }

    const {id} = await this.locationModel.create(objectLocation);
    this.logger.info('New location created');

    return id;
  }

  public async findOrCreate(nameCity: string): Promise<string> {
    const existedLocation = await this.locationModel.findOne({ name: nameCity});

    if (existedLocation) {
      return existedLocation.id;
    }

    return this.create(nameCity);
  }
}
