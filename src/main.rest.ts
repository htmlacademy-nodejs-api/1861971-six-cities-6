import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/const/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/index.js';
import {createOfferContainer} from './shared/modules/offer/index.js';
import {createLocationContainer} from './shared/modules/location/index.js';
import {createFavoriteContainer} from './shared/modules/favorite/index.js';
import {createAuthContainer} from './shared/modules/auth/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createLocationContainer(),
    createFavoriteContainer(),
    createAuthContainer()
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
