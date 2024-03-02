//import { Types } from 'mongoose';

export interface LocationService {
  create(nameCity: string): Promise<string>;
  findOrCreate(nameCity: string): Promise<string>;
}
