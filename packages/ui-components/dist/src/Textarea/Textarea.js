"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Textarea = ({ name, label, placeholder, value, onChange, errorMessage, }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex-grow", children: [(0, jsx_runtime_1.jsx)("label", { className: "block mb-2 font-medium text-base-content", children: label }), (0, jsx_runtime_1.jsx)("textarea", { name: name, className: "w-full p-2 border border-base-300 bg-base-100 text-base-content rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-2 placeholder-base-content/40", placeholder: placeholder, value: value, onChange: (e) => onChange(e.target.value), rows: 4 }), errorMessage && (0, jsx_runtime_1.jsx)("span", { className: "text-red-500 text-sm block", children: errorMessage })] }));
};
exports.default = Textarea;
