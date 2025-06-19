"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const variantClassMap = {
    neutral: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    blue: "bg-blue-gradient !text-white hover:opacity-90",
    small: "text-sm py-1 px-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800",
    greenBeneficialOwner: "bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800",
    redBeneficialOwner: "bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800",
};
const baseClasses = "inline-flex items-center justify-center px-6 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
const Button = ({ onClick, disabled = false, children, variant = "neutral", className = "", type = "button", }) => {
    const variantClasses = variantClassMap[variant] || variantClassMap.neutral;
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
    return ((0, jsx_runtime_1.jsx)("button", { type: type, onClick: onClick, disabled: disabled, className: `${baseClasses} ${variantClasses} ${disabledClasses} ${className}`, children: children }));
};
exports.default = Button;
