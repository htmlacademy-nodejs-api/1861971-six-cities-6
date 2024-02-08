import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { generateRandomValue, getRandomItems, getRandomItem } from '../../helpers/common.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_NUMBER = 0;
const MAX_NUMBER = 1;

const MIN_NUMBER_RATING = 1;
const MAX_NUMBER_RATING = 5;

const MIN_NUMBER_ROOMS = 1;
const MAX_NUMBER_ROOMS = 8;

const MIN_NUMBER_ADULTS = 1;
const MAX_NUMBER_ADULTS = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const {user, rentalOffer} = this.mockData;
    const {location} = rentalOffer;

    const title = getRandomItem<string>(rentalOffer.titles);
    const description = getRandomItem<string>(rentalOffer.descriptions);
    const previevImage = getRandomItem<string>(rentalOffer.previewImage);
    const images = rentalOffer.images.join(';');
    const isPremium = generateRandomValue(MIN_NUMBER, MAX_NUMBER);
    const isFavorite = generateRandomValue(MIN_NUMBER, MAX_NUMBER);
    const rating = generateRandomValue(MIN_NUMBER_RATING, MAX_NUMBER_RATING);
    const type = getRandomItem<string>(rentalOffer.housingTypes);
    const bedrooms = generateRandomValue(MIN_NUMBER_ROOMS, MAX_NUMBER_ROOMS);
    const maxAdalts = generateRandomValue(MIN_NUMBER_ADULTS, MAX_NUMBER_ADULTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const goods = getRandomItems<string>(rentalOffer.comfortsList).join(';');
    const numberComments = generateRandomValue(MIN_NUMBER_ADULTS, MIN_PRICE);

    const data = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const nameCity = getRandomItem<string>(rentalOffer.nameCitys);
    const [item] = location.filter(({name}) => name === nameCity);
    const city = Object.values(item).join(';');

    const name = getRandomItem<string>(user.names);
    const host = [
      name,
      `${name}.conner@gmail.com`,
      getRandomItem<string>(user.avatarUrls),
      getRandomItem<string>(user.typeUsers)
    ].join(';');

    return [
      title, description, data,
      city, previevImage, images,
      isPremium, isFavorite, rating,
      type, bedrooms, maxAdalts,
      price, goods, host,
      numberComments
    ].join('\t');
  }
}
