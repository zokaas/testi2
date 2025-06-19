import { Test, TestingModule } from "@nestjs/testing";
import { ProxyKycController } from "./proxy-kyc.controller";
import { ProxyKycService } from "./proxy-kyc.service";

describe("ProxyKycController", () => {
  let controller: ProxyKycController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProxyKycController],
      providers: [
        {
          provide: ProxyKycService,
          useValue: {
            getForm: jest.fn(),
            sendFormData: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProxyKycController>(ProxyKycController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
