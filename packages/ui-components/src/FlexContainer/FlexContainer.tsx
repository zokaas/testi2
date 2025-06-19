import React from "react";
import { T_FlexContainer } from "./flexContainerTypes";

const FlexContainer: React.FC<T_FlexContainer> = ({ children, className = "" }) => {
    return <div className={`flex flex-col space-y-4 ${className}`}>{children}</div>;
};

export default FlexContainer;
