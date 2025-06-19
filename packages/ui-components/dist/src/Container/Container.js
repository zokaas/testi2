"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Container = ({ children, className = "", maxWidth = "xl", padding = true, }) => {
    const maxWidthClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        full: "max-w-full",
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: `${maxWidthClasses[maxWidth]} mx-auto ${padding ? "my-10 p-8" : ""} bg-base-100 ${className}`, children: children }));
};
exports.default = Container;
