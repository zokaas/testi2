import { T_AuthSessionApiResponse, T_UserInfo, T_VerifySessionResponseData } from "~/types/session";
import { getRequest } from "./utils/apiHelpers.server";
import { buildUrl } from "./utils/urlHelpers.server";
import { getEnv } from "~/environment";
import { mockSessionData } from "mock/sessionMock";

export const verifySession = async (
    clientId: string,
    sessionId: string,
): Promise<T_VerifySessionResponseData> => {
    if (getEnv(process.env).USE_MOCK_DATA) {
        console.log("[MOCK] Verifying session");
        return {
            status: mockSessionData.status,
            ttl: mockSessionData.ttl,
        };
    }

    const verifyPath = "authenticate/verify";
    const url = buildUrl(verifyPath, clientId);

    try {
        return await getRequest<T_VerifySessionResponseData>(url, sessionId);
    } catch (error) {
        console.error("Failed to verify session", error);
        return { status: false, ttl: 0 }; // Return null in case of an error
    }
};

export const endSession = async (
    sessionId: string,
    clientId: string,
): Promise<T_AuthSessionApiResponse | null> => {
    if (getEnv(process.env).USE_MOCK_DATA) {
        console.log("[MOCK] Ending session");
        return { status: 200, data: "SUCCESS" };
    }

    const logoutPath = "authenticate/logout";
    const url = buildUrl(logoutPath, clientId);

    return getRequest<T_AuthSessionApiResponse>(url, sessionId);
};

export const getUserInfo = async (
    sessionId: string,
    clientId: string,
): Promise<T_UserInfo | null> => {
    const sessionInfoPath = "authenticate/sessioninfo";
    const url = buildUrl(sessionInfoPath, clientId);

    return getRequest<T_UserInfo>(url, sessionId);
};
