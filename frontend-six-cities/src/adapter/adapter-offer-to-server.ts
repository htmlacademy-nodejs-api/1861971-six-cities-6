import {
  NewOffer,
  City,
  Location
} from '../types/types';
import {OfferForServer} from './types/index';

export const adapterOfferToServer = (newOffer: NewOffer): OfferForServer => {
  type ChangeOffer = Omit<NewOffer & OfferForServer, 'city' | 'location' | 'maxAdults' | 'previewImage'> &
  {
    city?: City,
    location?: Location,
    maxAdults?: number,
    previewImage?: string
  }

  const changeOffer: ChangeOffer = {
    ...newOffer,
    nameCity: newOffer.city.name,
    coordinates: newOffer.location,
    maxAdalts: newOffer.maxAdults,
    previevImage: newOffer.previewImage
  };

  delete changeOffer.city;
  delete changeOffer.location;
  delete changeOffer.maxAdults;
  delete changeOffer.previewImage;

  return changeOffer;
};
