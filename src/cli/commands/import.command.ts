import { AbstractCommand } from './abstract-command.js';
import { UserService, DefaultUserService, UserModel } from '../../shared/modules/user/index.js';
import { OfferService, DefaultOfferService, OfferModel } from '../../shared/modules/offer/index.js';
import { Logger, ConsoleLogger } from '../../shared/libs/logger/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { COLOR_SUCCESS, COLOR_ERROR, DEFAULT_USER_PASSWORD, DEFAULT_DB_PORT } from '../../shared/const/index.js';
import { Offer } from '../../shared/types/index.js';

export class ImportCommand extends AbstractCommand {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    super();
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public get name(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(COLOR_SUCCESS(`${count} rows imported.`));
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const {nameCity, coordinates: {latitude, longitude}} = offer.location;

    const user = await this.userService.findOrCreate({
      ...offer.dataHost,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      data: offer.data,
      nameCity: nameCity,
      previevImage: offer.previevImage,
      images: offer.images,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      type: offer.type,
      bedrooms: offer.bedrooms,
      maxAdalts: offer.maxAdalts,
      price: offer.price,
      goods: offer.goods,
      dataHost: user.id,
      numberComments: offer.numberComments,
      coordinates: {
        latitude,
        longitude
      }
    });
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (err) {
      console.error(COLOR_ERROR(`Can't import data from file: ${filename}`));
      console.error(COLOR_ERROR(getErrorMessage(err)));
    }
  }
}
