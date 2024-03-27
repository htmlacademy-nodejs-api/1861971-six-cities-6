import {
  MinLength,
  MaxLength,
  Min,
  Max
} from 'class-validator';
import {CreateCommentValidationMessage} from './create-comment.messages.js';

export class CreateCommentDto {

  @MinLength(5, {message: CreateCommentValidationMessage.text.minLength})
  @MaxLength(1024, {message: CreateCommentValidationMessage.text.maxLength})
  public text: string;

  @Min(1, {message: CreateCommentValidationMessage.rating.minValue})
  @Max(5, {message: CreateCommentValidationMessage.rating.maxValue})
  public rating: number;
}
