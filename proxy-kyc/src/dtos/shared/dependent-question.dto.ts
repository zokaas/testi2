import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { DynamicFieldDto } from "./dynamic-field.dto";
import { Type } from "class-transformer";
import { ErrorMessageDto } from "./error-message.dto";

export class DependentQuestionDto extends DynamicFieldDto {
  @IsString()
  __component: "kyc.dependent-question";

  @IsString()
  conditionValue: string;

  @IsString()
  questionLabel: string;

  @IsString()
  componentType: string;

  @IsOptional()
  @IsString()
  placeholder?: string;

  @IsString()
  questionParameter: string;

  @IsOptional()
  @IsString()
  questionDescription?: string;

  @IsOptional()
  options?: string[];

  @IsOptional()
  @IsBoolean()
  useCountryList?: boolean;

  @IsOptional()
  @IsString()
  countryListLang?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ErrorMessageDto)
  errorMessages?: ErrorMessageDto[];
}
