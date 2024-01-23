import { Offer } from '../types/offer.type.js';

export function createOffer(dataOffer: string): Offer {

  const [
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
  ] = dataOffer.replace('\n', '').split('\t');

  const [nameCity, latitude, longitude] = city.split(';');
  const [name, email, avatarUrl, password, typeUsers] = host.split(';');

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
    isPremium: !!Number(isPremium),
    isFavorite: !!Number(isFavorite),
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
      isPro: typeUsers
    },
    numberComments: Number(numberComments)
  });

}
