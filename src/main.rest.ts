import 'reflect-metadata';
import { Container } from 'inversify';
import { PinoLogger, Logger } from './shared/logger/index.js';
import { RestConfig, Config, RestSchema } from './shared/config/index.js';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/const/index.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
