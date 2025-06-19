import { Test, TestingModule } from "@nestjs/testing";
import { ProxyKycService } from "./proxy-kyc.service";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { KycFormParser } from "./utils/kyc-form-parser";

describe("ProxyKycService", () => {
  let service: ProxyKycService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: {
            request: jest.fn(),
          },
        },
        {
          provide: KycFormParser,
          useValue: {
            parseProductData: jest.fn(),
            parseCountryList: jest.fn(),
          },
        },
        ProxyKycService,
      ],
    }).compile();

    service = module.get<ProxyKycService>(ProxyKycService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
