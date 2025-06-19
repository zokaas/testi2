import { Type } from "class-transformer";
import { IsString, IsOptional, IsArray, ValidateNested } from "class-validator";
import { DynamicFieldDto } from "../shared";
import { ApiErrorMessageWrapperDto } from "./api-error-message-wrapper.dto";

export class ApiQuestionDto {
  @IsString()
  questionParameter: string;

  @IsString()
  questionLabel: string;

  @IsString()
  componentType: string;

  @IsOptional()
  @IsString()
  placeholder?: string;

  @IsOptional()
  @IsArray()
  options?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ApiErrorMessageWrapperDto)
  error_messages: ApiErrorMessageWrapperDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DynamicFieldDto)
  dynamicField: DynamicFieldDto[];
}
