export const isKYCServiceDisabled = (): boolean => {
    return Number(import.meta.env.VITE_ACTIVE_KYC_SERVICE) === 0;
};

export const isKYCRedirectActive = (): boolean => {
    return import.meta.env.VITE_ACTIVE_KYC_REDIRECT === "1";
};