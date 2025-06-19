"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const FlexContainer = ({ children, className = "" }) => {
    return (0, jsx_runtime_1.jsx)("div", { className: `flex flex-col space-y-4 ${className}`, children: children });
};
exports.default = FlexContainer;
