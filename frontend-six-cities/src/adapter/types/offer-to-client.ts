import {
  City,
  Location,
  Type
} from '../../types/types';
import {User} from './index';

export type OfferToClient = {
  id: string;
  title: string;
  description: string;
  city: City;
  previevImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: Type;
  bedrooms: number;
  maxAdalts: number;
  price: number;
  goods: string[];
  dataHost: User;
  coordinates: Location;
};
