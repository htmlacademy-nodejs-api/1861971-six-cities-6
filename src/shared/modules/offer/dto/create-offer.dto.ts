import {
  MinLength,
  MaxLength,
  IsEnum,
  IsNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
  Min,
  Max,
  IsMongoId,
  IsInt,
  IsArray,
  IsObject
} from 'class-validator';
import {NameCity, HousingTypes, ComfortList} from '../../../const/index.js';
import {CreateOfferValidationMessage} from './create-offer.messages.js';
import {Location} from '../../../types/index.js';

export class CreateOfferDto {

  @MinLength(10, {message: CreateOfferValidationMessage.title.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.title.maxLength})
  public title: string;

  @MinLength(20, {message: CreateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: CreateOfferValidationMessage.description.maxLength})
  public description: string;

  @IsEnum(NameCity, {message: CreateOfferValidationMessage.nameCity.invalid})
  public nameCity: string;

  @IsNotEmpty({message: CreateOfferValidationMessage.previevImage.notEmpty})
  public previevImage: string;

  @ArrayMinSize(6, {message: CreateOfferValidationMessage.image.arrayMinSizeAndMaxSize})
  @ArrayMaxSize(6, {message: CreateOfferValidationMessage.image.arrayMinSizeAndMaxSize})
  public images: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.meaning})
  public isPremium: boolean;

  @IsEnum(HousingTypes, {message: CreateOfferValidationMessage.type.invalid})
  public type: string;

  @IsInt({message: CreateOfferValidationMessage.bedrooms.meaning})
  @Min(1, {message: CreateOfferValidationMessage.bedrooms.meaning})
  @Max(8, {message: CreateOfferValidationMessage.bedrooms.meaning})
  public bedrooms: number;

  @IsInt({message: CreateOfferValidationMessage.maxAdalts.meaning})
  @Min(1, {message: CreateOfferValidationMessage.maxAdalts.meaning})
  @Max(10, {message: CreateOfferValidationMessage.maxAdalts.meaning})
  public maxAdalts: number;

  @Min(100, {message: CreateOfferValidationMessage.price.minValue})
  @Max(100000, {message: CreateOfferValidationMessage.price.maxValue})
  public price: number;

  @IsArray({message: CreateOfferValidationMessage.goods.arrayMinSizeAndMaxSize})
  @IsEnum(ComfortList, {each:true, message: CreateOfferValidationMessage.goods.invalid})
  public goods: ComfortList[];

  @IsMongoId({message: CreateOfferValidationMessage.dataHost.invalidId})
  public dataHost: string;

  @IsObject({ message: CreateOfferValidationMessage.coordinates.invalidFormat })
  public coordinates: Location;
}
