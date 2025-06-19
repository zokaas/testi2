import { isKYCServiceDisabled } from "../utils/kycServiceStatus";
import { T_FormFields } from "./types";

export const getRequiredFields = (fields: T_FormFields) => {
    return [
        {
            blockName: "pre-info",
            fields: [
                "loanAmount",
                "repaymentPeriod",
                "organizationNumber",
                "emailAddress",
                "applicantPhone",
                "businessCheck",
                ...(isKYCServiceDisabled() ? ["loanPurpose", "loanPurposeDescription"] : []),
            ],
        },
        {
            blockName: "basicInfo",
            fields: [
                "loanAmount",
                "repaymentPeriod",
                ...(isKYCServiceDisabled() ? ["loanPurpose", "loanPurposeDescription"] : []),
                "invoiceDueDate",
            ],
        },
        {
            blockName: "companyInfo",
            fields: ["streetAddress", "zipCode", "city", "disburismentAccount"],
        },
        {
            blockName: "applicantInfo",
            fields: ["emailAddress", "applicantPhone", ...(isKYCServiceDisabled() ? ["PEP"] : [])],
        },
        {
            blockName: "guarantorInfo",
            fields: fields.otherAsFirstGuarantor
                ? [
                      "otherAsFirstGuarantor",
                      "guarantorName",
                      "guarantorEmail",
                      "guarantorPhone",
                      "guarantorInfoBlockError",
                  ]
                : ["selfGuarantor", "guarantorInfoBlockError"],
        },
        {
            blockName: "secondGuarantorInfo",
            fields: ["secondGuarantorName", "secondGuarantorEmail", "secondGuarantorPhone"],
        },
        {
            blockName: "attachments",
            fields: ["attachments"],
        },
    ];
};
