import { T_GetFormResponse, T_SendFormDataResponse } from "~/types";
import { mockCountryList, mockProductData } from "./formMock";

export const mockFormResponse: T_GetFormResponse = {
    productData: mockProductData,
    countryList: mockCountryList,
};

export const mockSubmitResponse: T_SendFormDataResponse = {
    status: "ok",
    message: "Data submitted successfully",
    storeId: 1,
};
