import { MiddlewareConsumer, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { LoggerModule, LoggerService } from "@opr-finance/logger";
import { ProxyKycService } from "./proxy-kyc.service";
import { ProxyKycController } from "./proxy-kyc.controller";
import {
  AuthenticationModule,
  SessionMiddleware,
} from "@opr-finance/authentication";
import { KycFormParser } from "./utils/kyc-form-parser";

@Module({
  imports: [LoggerModule, HttpModule, AuthenticationModule],
  providers: [ProxyKycService, LoggerService, KycFormParser],
  exports: [ProxyKycService, LoggerService],
  controllers: [ProxyKycController],
})
export class ProxyKycModule {
  public async configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes(ProxyKycController);
  }
}
