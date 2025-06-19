import { cleanLocalStorage } from "./cleanLocalStorage";

export const handleKycRedirect = (organizationNumber: string, name: string): boolean => {
    const kycFormBaseUrl = import.meta.env.VITE_KYC_FORM_URL as string;
    const cid = import.meta.env.VITE_AUTH_CLIENT_ID as string;

    const sessionId = localStorage.getItem("id") ?? "";
    const uuid = localStorage.getItem("applicationUuid");
    
    let applicationUuid;
    try {
        applicationUuid = uuid ? JSON.parse(uuid) : null;
    } catch (error) {
        console.error("Failed to parse applicationUuid:", error);
        return false;
    }

    if (!kycFormBaseUrl || !organizationNumber || !name || !applicationUuid?.uuid) {
        console.log("Redirection was unsuccessful due to missing data.");
        console.log(kycFormBaseUrl, organizationNumber, name, applicationUuid?.uuid);
        return false;
    }

    cleanLocalStorage();
    const kycType = "onboarding";

const kycServiceUrl = `https://localhost:5000?orgNumber=${organizationNumber}&name=${name}&sessionId=${sessionId}&source=${cid}&kycType=${kycType}&appId=${applicationUuid.uuid}`;
    window.location.href = kycServiceUrl;
    return true;
}