import { IsObject, IsArray, ValidateNested, IsString } from "class-validator";
import { KycFormDto } from "./kyc-form-data.dto";

export class RootDto {
  @ValidateNested()
  @IsObject()
  productData: KycFormDto;

  @IsArray()
  @IsString({ each: true })
  countryList: string[];
}
