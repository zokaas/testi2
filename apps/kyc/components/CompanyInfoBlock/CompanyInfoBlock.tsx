import { useLoaderData } from "@remix-run/react";
import React from "react";
import { T_CompanyBlock } from "~/types";
// TODO:Hardcoded translations
export const CompanyInfoBlock: React.FC = () => {
    const { companyName, orgNumber, companyNameLabel, orgNumberLabel } =
        useLoaderData<T_CompanyBlock>();
    return (
        <div className="bg-base-200/50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-sm font-medium text-base-content/70 mb-1">
                        {companyNameLabel}
                    </p>
                    <p className="text-base font-semibold text-base-content">{companyName}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-base-content/70 mb-1">
                        {orgNumberLabel}
                    </p>
                    <p className="text-base font-semibold text-base-content">{orgNumber}</p>
                </div>
            </div>
        </div>
    );
};

export default CompanyInfoBlock;
