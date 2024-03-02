export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel'),
  OfferController: Symbol.for('OfferController'),
  UserController: Symbol.for('UserController'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  LocationService: Symbol.for('LocationService'),
  LocationModel: Symbol.for('LocationModel'),
  FavoriteModel: Symbol.for('FavoriteModel'),
  FavoriteService: Symbol.for('FavoriteService'),
  FavoriteController: Symbol.for('FavoriteController')
} as const;
