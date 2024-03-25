import {
  OfferToClient,
  User
} from './types/index';
import {
  Offer,
  Location,
} from '../types/types';

export const adapterOfferToClient = (offer: OfferToClient): Offer => {
  type ChangeOffer = Omit<OfferToClient & Offer,
  'coordinates' | 'previevImage' | 'dataHost' | 'maxAdalts'> &
  {
    coordinates?: Location,
    previevImage?: string,
    dataHost?: User,
    maxAdalts?: number
  }

  const changeOffer: ChangeOffer = {
    ...offer,
    location: offer.coordinates,
    previewImage: offer.previevImage,
    host: {
      ...offer.dataHost,
      type: offer.dataHost.isPro
    },
    maxAdults: offer.maxAdalts
  };

  delete changeOffer.coordinates;
  delete changeOffer.previevImage;
  delete changeOffer.dataHost;
  delete changeOffer.maxAdalts;

  return changeOffer;
};
