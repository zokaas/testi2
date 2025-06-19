"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Input = ({ name, label, placeholder, value, onChange, type = "text", errorMessage, }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex-grow", children: [(0, jsx_runtime_1.jsx)("label", { className: "block mb-2 font-medium text-base-content", children: label }), (0, jsx_runtime_1.jsx)("input", { name: name, type: type, className: "w-full p-2 border border-base-300 bg-base-100 text-base-content rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-base-content/40", placeholder: placeholder, value: value, onChange: (e) => onChange(e.target.value) }), errorMessage && (0, jsx_runtime_1.jsx)("span", { className: "text-red-500 text-sm block", children: errorMessage })] }));
};
exports.default = Input;
