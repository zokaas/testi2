"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Footer = ({ footer }) => {
    const { customerServiceLabel, customerServiceText, contactInfoLabel, contactInfoText, addressLabel, addressText, } = footer;
    return ((0, jsx_runtime_1.jsx)("footer", { className: "w-full bg-neutral text-neutral-content py-10 mt-auto", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-6xl mx-auto px-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row justify-between gap-8 text-left", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1 min-w-[200px]", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-bold mb-3", children: customerServiceLabel }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm opacity-80", children: customerServiceText })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 min-w-[200px]", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-bold mb-3", children: contactInfoLabel }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm opacity-80", children: contactInfoText })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 min-w-[200px]", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-bold mb-3", children: addressLabel }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm opacity-80", children: addressText })] })] }) }) }));
};
exports.default = Footer;
