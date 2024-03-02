import { User } from './user.type.js';
import { CityLocation } from './city-location.type.js';

export type Offer = {
title: string;
description: string;
data: string;
nameCity: string;
location?: CityLocation | string;
previevImage: string;
images: string[];
isPremium: boolean;
isFavorite?: boolean;
rating: number;
type: string;
bedrooms: number;
maxAdalts: number;
price: number;
goods?: string[];
dataHost: User | string;
numberComments?: number;
};
