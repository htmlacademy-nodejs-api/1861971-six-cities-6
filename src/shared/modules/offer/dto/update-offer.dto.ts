import {
  MinLength,
  MaxLength,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
  Min,
  Max,
  IsInt,
  IsArray,
  IsOptional
} from 'class-validator';
import {NameCity, HousingTypes, ComfortList} from '../../../const/index.js';
import {CreateOfferValidationMessage} from './create-offer.messages.js';

export class UpdateOfferDto {

  @IsOptional()
  @MinLength(10, {message: CreateOfferValidationMessage.title.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.title.maxLength})
  public title?: string;

  @IsOptional()
  @MinLength(20, {message: CreateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: CreateOfferValidationMessage.description.maxLength})
  public description?: string;

  @IsOptional()
  @IsDateString({message: CreateOfferValidationMessage.date.invalidFormat})
  public data?: string;

  @IsOptional()
  @IsEnum(NameCity, {message: CreateOfferValidationMessage.nameCity.invalid})
  public nameCity?: string;

  @IsOptional()
  @IsNotEmpty({message: CreateOfferValidationMessage.previevImage.notEmpty})
  public previevImage?: string;

  @IsOptional()
  @ArrayMinSize(6, {message: CreateOfferValidationMessage.image.arrayMinSizeAndMaxSize})
  @ArrayMaxSize(6, {message: CreateOfferValidationMessage.image.arrayMinSizeAndMaxSize})
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: CreateOfferValidationMessage.isPremium.meaning})
  public isPremium?: boolean;

  @IsOptional()
  public isFavorite?: boolean;

  @IsOptional()
  @Min(1, {message: CreateOfferValidationMessage.rating.meaning})
  @Max(5, {message: CreateOfferValidationMessage.rating.meaning})
  public rating?: number;

  @IsOptional()
  @IsEnum(HousingTypes, {message: CreateOfferValidationMessage.type.invalid})
  public type?: string;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessage.bedrooms.meaning})
  @Min(1, {message: CreateOfferValidationMessage.bedrooms.meaning})
  @Max(8, {message: CreateOfferValidationMessage.bedrooms.meaning})
  public bedrooms?: number;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessage.maxAdalts.meaning})
  @Min(1, {message: CreateOfferValidationMessage.maxAdalts.meaning})
  @Max(10, {message: CreateOfferValidationMessage.maxAdalts.meaning})
  public maxAdalts?: number;

  @IsOptional()
  @Min(100, {message: CreateOfferValidationMessage.price.minValue})
  @Max(100000, {message: CreateOfferValidationMessage.price.maxValue})
  public price?: number;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.goods.arrayMinSizeAndMaxSize})
  @IsEnum(ComfortList, {each:true, message: CreateOfferValidationMessage.goods.invalid})
  public goods?: string[];

  @IsOptional()
  public coordinates?: string;
}
