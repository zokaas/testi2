import { T_LoginState } from "@opr-finance/features/login-session";
import { T_FormFields } from "../hooks/types";
import { T_FormattedAttachmentFileObject } from "@opr-finance/features/file-upload-handler/types";

export type T_StartPagePayload = {
    uuid: string;
};
export type T_AttachmentFileObject = {
    dataUrl: string;
    name: string;
    type: string;
    size: number;
};

export const applicationSteps = {
    SIGNED_IN: 0,
    FILL: 33,
    CHECK: 66,
    SENT: 100,
} as const;

export const applicationStepsTitle = {
    SIGNED_IN: "Identifiering",
    FILL: "Ansökan",
    CHECK: "Förhandsvisa",
    SENT: "Skicka",
} as const;

export type T_Error = {
    name: string;
    message: string | null;
};

export type T_EventType = {
    name: string;
    value: string | boolean | T_AttachmentFileObject[] | number | null;
};

export type T_SelectOption = {
    id?: string;
    value: number | string | null;
    label: string;
};

export type T_PrefilledApplicationData = {
    amount: number;
    maturity: number;
    dataPrivacy: boolean;
    source: string;
    applicationUuid: string;
    company: T_BasicCompany;
    applicant: T_BasicApplicant;
    guarantor: T_Guarantor;
    brokerApplicationId?: string;
};

export type T_BasicCompany = {
    organizationNumber: string;
    name: string;
    streetAddress: string;
    zipcode: string;
    city: string;
    accountNumber: string;
};

export type T_Company = {
    organizationNumber: string;
    name: string;
    streetAddress: string;
    city: string;
    accountNumber: string;
    businessSector: string;
    zipCode: string;
};

export type T_BasicApplicant = {
    name: string;
    ssn: string;
    email: string;
    phoneNumber: string;
};

export type T_Applicant = T_BasicApplicant & {
    creditCheck: boolean;
    pep: boolean;
    marketingPermission: boolean;
    selfGuarantor: boolean;
};

export type T_Guarantor = {
    name: string;
    ssn: string;
    email: string;
    phoneNumber: string;
    allowsCreditCheck: boolean;
};

export type T_FirstGuarantor = T_SecondGuarantor & {
    applicantAsFirstGuarantor: boolean;
    ssn?: string;
};

export type T_SecondGuarantor = {
    name: string;
    email: string;
    phone: string;
};
export type T_Guarantors = {
    firstGuarantor: T_FirstGuarantor;
    secondGuarantor?: T_SecondGuarantor;
};

export type T_ApplicationData = {
    applicationUuid: string;
    amount: number;
    maturity: number;
    brokerApplicationId?: string;
    desiredDueDate: number;
    loanReason: string;
    loanPurposeDescription: string;
    campaignCode: string;
    company: T_Company;
    applicant: T_Applicant;
    guarantors: T_Guarantors;
    attachments: T_FormattedAttachmentFileObject[];
    source: string;
    subsource: string;
    redirectId: string;
    ip: string;
    gaClientId: string;
    gaTransactionId: string;
    gaSessionId: string;
    timestamp: string;
    production: number;
};

export type T_PreFormData = {
    loanAmount: string;
    repaymentPeriod: string;
    organizationNumber: string;
    emailAddress: string;
    applicantPhone: string;
};

export enum E_RequiredFormBlock {
    BASIC_INFO = "basicInfo",
    COMPANY_INFO = "companyInfo",
    APPLICANT_INFO = "applicantInfo",
    GUARANTOR_INFO = "guarantorInfo",
    SECOND_GUARANTOR_INFO = "secondGuarantorInfo",
}

export type T_RedirectProps = {
    url: string;
};

export type T_GatewayProps = {
    mock: boolean;
    authUrl: string;
    cid: string;
    lang: string;
    basebffUrl: string;
    verifyUrl: string;
    errorUrl: string;
    expiredUrl: string;
    getUserDataUrl: string;
    logoutUrl: string;
    refreshSessionUrl: string;
};

export type T_FrendsProps = {
    mock: boolean;
    frendsUrl: string;
    apiKey: string;
};

export type T_ApplicationDataReducerState = {
    data: T_PrefilledApplicationData | null;
};

export type T_LocationState = {
    history: string;
    fields: T_FormFields;
    secondGuarantorVisible: boolean;
};
