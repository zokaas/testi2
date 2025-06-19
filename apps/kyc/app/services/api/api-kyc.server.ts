import { getEnv } from "~/environment";
import { T_SendFormDataResponse, T_Payload, T_GetFormResponse } from "~/types/apiTypes";
import { getRequest, postRequest } from "../utils/apiHelpers.server";
import { mockFormResponse, mockSubmitResponse } from "mock/apiResponseMock";

export async function sendFormData(
    data: T_Payload,
    productId: string = "",
    kycType: string = "",
    applicationId: string = "",
    sessionId: string = "",
): Promise<T_SendFormDataResponse> {
    if (getEnv(process.env).USE_MOCK_DATA) {
        console.log("[MOCK] Submitting form data:", data);
        return mockSubmitResponse;
    }

    const sendFormPath = "answers";
    const apiBaseUrl = getEnv(process.env).BFF_BASE_URL;
    const apiBasePath = getEnv(process.env).BFF_KYC_BASE_PATH;
    const url = `${apiBaseUrl}/${apiBasePath}/form/${sendFormPath}/${productId}/${kycType}/${applicationId}`;

    //const url = `${getEnv(process.env).API_BASE_URL}/${sendFormPath}/2/1/3`;
    return postRequest(url, sessionId, data);
}

export async function getForm(
    productId: string,
    kycType: string,
    sessionId: string,
): Promise<T_GetFormResponse> {
    if (getEnv(process.env).USE_MOCK_DATA) {
        console.log("[MOCK] Fetching form data");
        return mockFormResponse;
    }

    const apiBaseUrl = getEnv(process.env).BFF_BASE_URL;
    const apiBasePath = getEnv(process.env).BFF_KYC_BASE_PATH;
    const url = `${apiBaseUrl}/${apiBasePath}/form/${productId}/${kycType}`;
    const response: T_GetFormResponse = await getRequest(url, sessionId);
    // console.log("API URL:", url);
    // console.log("Session ID:", sessionId);
    // console.log("response", response);
    return {
        productData: {
            product: response.productData.product,
            formType: response.productData.formType,
            formHeader: response.productData.formHeader,
            companyBlock: response.productData.companyBlock,
            steps: response.productData.steps,
            button: response.productData.button,
            footer: response.productData.footer,
            questions: response.productData.questions,
        },
        countryList: response.countryList,
    };
}

//TODO: fetch countryLists from api
