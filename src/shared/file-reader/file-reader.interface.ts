import { Offers } from '../types/index.js';

export interface FileReader {
  read(): void;
  toArray(): Offers;
}
