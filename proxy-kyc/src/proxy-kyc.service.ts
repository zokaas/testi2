import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosRequestConfig, Method } from "axios";
import { catchError, lastValueFrom, map } from "rxjs";
import { RootDto, ApiFormWrapperDto, KycFormDto } from "./dtos";
import { KycFormParser } from "./utils/kyc-form-parser";

@Injectable()
export class ProxyKycService {
  private readonly logger = new Logger(ProxyKycService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly kycFormParser: KycFormParser
  ) {}

  getHello(): { status: string } {
    return {
      status: "Hello from proxy-kyc",
    };
  }

  private getRequestConfig<T>(
    path: string,
    method: Method,
    contentType?: string,
    params?: T
  ): AxiosRequestConfig {
    const baseUrl = this.configService.get("kycApi.url");
    const xApiKey = this.configService.get("kycApi.xApiKey");

    const url = encodeURI(`${baseUrl}/${path}`);

    return {
      url,
      method,
      headers: {
        "Content-Type": contentType,
        "x-apikey": xApiKey,
      },
      params,
    };
  }

  private async sendRequestToApi<R>(
    path: string,
    requestConfig: AxiosRequestConfig
  ): Promise<R> {
    return await lastValueFrom<R>(
      this.httpService.request(requestConfig).pipe(
        map((res) => res.data),
        catchError((err) => {
          throw new HttpException(err.response.data, err.response.status);
        })
      )
    );
  }

  async getProductData(
    productId: string,
    kycType: string
  ): Promise<KycFormDto> {
    const apiPath = `form/${productId}/${kycType}`;
    const requestConfig = this.getRequestConfig(apiPath, "GET");

    const response = await this.sendRequestToApi<ApiFormWrapperDto>(
      apiPath,
      requestConfig
    );
    this.logger.log(response);
    const productData = this.kycFormParser.parseProductData(
      response,
      productId
    );
    return productData;
  }

  async getCountryList(productId: string): Promise<string[]> {
    const apiPath = "countrylist";
    const requestConfig = this.getRequestConfig(apiPath, "GET");

    const response = await this.sendRequestToApi<string[]>(
      apiPath,
      requestConfig
    );
    return this.kycFormParser.parseCountryList(response, productId);
  }

  async getForm(productId: string, kycType: string): Promise<RootDto> {
    const productData = await this.getProductData(productId, kycType);
    const countryList = await this.getCountryList(productId);
    return { productData, countryList };
  }

  async sendFormData<R = unknown>(
    payload: unknown,
    apiPath: string,
    contentType: string
  ): Promise<R> {
    const requestConfig: AxiosRequestConfig = {
      ...this.getRequestConfig(apiPath, "POST", contentType),
      data: payload,
    };

    this.logger.log(requestConfig);
    const response = await this.sendRequestToApi<R>(apiPath, requestConfig);

    return response;
  }
}
