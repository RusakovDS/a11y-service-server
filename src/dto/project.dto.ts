import {ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, Matches, MaxLength, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

class UrlSubDto {

  @IsNotEmpty()
  @Matches(new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/))
  name: string;
}

export class ProjectDto {

  @IsNotEmpty()
  title: string;

  @MaxLength(100)
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({each: true})
  @Type(() => UrlSubDto)
  urls: UrlSubDto[]

}
