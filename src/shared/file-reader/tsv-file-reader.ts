import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offers } from '../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offers {
    if (!this.rawData) {
      throw new Error(`File not read on path: ${this.filename}`);
    }


    const offerList = this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        title,
        description,
        data,
        city,
        previevImage,
        images,
        isPremium,
        isFavorite,
        rating,
        type,
        bedrooms,
        maxAdalts,
        price,
        goods,
        host,
        numberComments
      ]) => {
        const [latitude, longitude, nameCity] = city.split(';');
        const [name, email, avatarUrl, password, isPro] = host.split(';');

        return({
          title,
          description,
          data,
          location: {
            coordinates: {
              latitude: Number(latitude),
              longitude: Number(longitude)
            },
            nameCity
          },
          previevImage,
          images: images.split(';'),
          isPremium: !!isPremium,
          isFavorite: !!isFavorite,
          rating: Number(rating),
          type,
          bedrooms: Number(bedrooms),
          maxAdalts: Number(maxAdalts),
          price: Number(price),
          goods: goods.split(';'),
          dataHost: {
            name,
            email,
            avatarUrl,
            password,
            isPro: !!isPro
          },
          numberComments: Number(numberComments)
        });
      });

    return offerList;
  }
}
