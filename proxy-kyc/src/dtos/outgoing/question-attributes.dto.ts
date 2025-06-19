import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  ValidateNested,
} from "class-validator";
import {
  BeneficialOwnerDto,
  CountryOptionsDto,
  DependentQuestionDto,
  DynamicFieldDto,
  DynamicFieldUnion,
  ErrorMessageDto,
  InfoDto,
} from "../shared";
import { Type } from "class-transformer";

export class QuestionAttributesDto {
  @IsString()
  questionLabel: string;

  @IsString()
  componentType: string;

  @IsNumber()
  step: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];

  @IsOptional()
  @IsString()
  placeholder?: string;

  @IsString()
  questionParameter: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ErrorMessageDto)
  errorMessages?: ErrorMessageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DynamicFieldDto, {
    discriminator: {
      property: "__component",
      subTypes: [
        { value: DependentQuestionDto, name: "kyc.dependent-question" },
        { value: InfoDto, name: "kyc.info" },
        { value: BeneficialOwnerDto, name: "kyc.beneficial-owner" },
        { value: CountryOptionsDto, name: "kyc.country-options" },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  dynamicField: DynamicFieldUnion[];
}
