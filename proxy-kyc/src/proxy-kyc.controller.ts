import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ProxyKycService } from "./proxy-kyc.service";
import { AuthenticationGuard } from "@opr-finance/authentication";
import { ContentType } from "@opr-finance/decorators";
import { KycFormDto } from "./dtos";

@Controller("proxy-kyc")
export class ProxyKycController {
  private readonly logger = new Logger(ProxyKycController.name);
  constructor(private readonly proxyKycService: ProxyKycService) {}

  @Get("/form/:kcClientId/:kycType")
  @UseGuards(AuthenticationGuard)
  async getForm(
    @Param("kcClientId") productId: string,
    @Param("kycType") kycType: string
  ) {
    this.logger.log(
      `\nname = getKycForm \nproductId = ${productId}; \nkycType = ${kycType}; \n`
    );
    const response: { productData: KycFormDto; countryList: string[] } =
      await this.proxyKycService.getForm(productId, kycType);
    this.logger.log(response);
    return response;
  }

  @Post("/form/*")
  @UseGuards(AuthenticationGuard)
  async sendFormAnswers(
    @Body() payload,
    @Param() path: Array<string>,
    @ContentType() contentType: string
  ) {
    const apiPath = path[0];
    // TODO: can we use kcClientId as a productId? then this is unnecessary:
    // Split the path and remove the second element
    // const pathSegments = apiPath.split("/");
    // if (pathSegments.length > 1) {
    //   pathSegments.splice(1, 1);
    // }
    // apiPath = pathSegments.join("/");
    this.logger.log(
      `\nname = sendAnswersToKYC \napiPath = ${apiPath}; \ncontentType = ${contentType}; \n`
    );
    // apiKycUrl = "https://inbound2.common.eu-central-1.858251697328.aws.opr-finance.com/v1/api-kyc/answers/:productId/:kycType/:applicationId";
    const response = await this.proxyKycService.sendFormData(
      payload,
      apiPath,
      contentType
    );
    this.logger.log(response);
    return response;
  }
}
