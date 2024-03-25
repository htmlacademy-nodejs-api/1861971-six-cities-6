import {Location} from '../../types/types';

export type OfferForServer = {
  title: string;
  description: string;
  nameCity: string;
  previevImage: string;
  images: string[];
  isPremium: boolean;
  type: string;
  bedrooms: number;
  maxAdalts: number;
  price: number;
  goods: string[];
  coordinates: Location;
}
