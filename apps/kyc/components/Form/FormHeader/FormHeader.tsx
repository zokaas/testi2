import { useLoaderData } from "@remix-run/react";
import React from "react";
import { loader } from "~/root";

export const FormHeader: React.FC = () => {
    const { productData } = useLoaderData<typeof loader>();
    const { title, subtitle } = productData.formHeader || {};
    return (
        <div className="text-center mb-8">
            {title && <h2 className="text-3xl font-bold text-base-content mb-2">{title}</h2>}
            {subtitle && <p className="text-base-content/70">{subtitle}</p>}
        </div>
    );
};

export default FormHeader;
